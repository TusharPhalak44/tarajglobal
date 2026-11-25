import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import DOMPurify from 'dompurify'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronRight,
  User,
  Sparkles,
  ArrowRight,
  ListFilter,
  CheckCircle2,
  Quote,
  Target,
  ExternalLink,
  Eye,
  Linkedin,
  Twitter
} from 'lucide-react'
import Container from '@components/layout/Container'
import ShareArticle from '@components/blog/ShareArticle'
import SEO from '@components/common/SEO'
import BlogCard from '@components/blog/BlogCard'
import BlogFAQ, { DEFAULT_BLOG_FAQS } from '@components/blog/BlogFAQ'
import { publicAPI } from '@api/public.api'
import { mediaUrl } from '@utils/media'
import { formatAuthorName } from '@utils/formatAuthor'

function BlogDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState('')
  const [articleProgress, setArticleProgress] = useState(0)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const tocNavRef = useRef(null)
  const articleContainerRef = useRef(null)
  const isManualClickScrollingRef = useRef(false)
  const isHoveringTocRef = useRef(false)

  // Scroll reading progress
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      setLoading(true)
      setError(null)
      const searchParams = new URLSearchParams(window.location.search)
      const isPreview = searchParams.get('preview') === 'true'
      const response = await publicAPI.getBlogBySlug(slug, isPreview ? { preview: 'true' } : undefined)
      const currentBlog = response?.data?.data
      if (currentBlog) {
        currentBlog.author_name = formatAuthorName(currentBlog.author_name || currentBlog.author)
      }
      setBlog(currentBlog)

      // Ensure the browser URL reflects the exact blog slug
      if (currentBlog?.slug && slug !== currentBlog.slug) {
        const previewQuery = isPreview ? '?preview=true' : ''
        navigate(`/blog/${currentBlog.slug}${previewQuery}`, { replace: true })
      }

      // Fetch related blogs (latest 3 excluding current)
      try {
        const relatedRes = await publicAPI.getBlogs({ limit: 4 })
        const all = relatedRes?.data?.data || []
        setRelatedBlogs(all.filter((b) => b.slug !== slug).slice(0, 3))
      } catch (relErr) {
        console.warn('Could not load related blogs:', relErr)
      }
    } catch (err) {
      console.error('Failed to fetch blog:', err)
      setError('Article not found or could not be loaded.')
    } finally {
      setLoading(false)
    }
  }

  // Process and sanitize blog content, extracting Table of Contents and ensuring headings have IDs
  const processedArticle = useMemo(() => {
    if (!blog?.content) return { html: '', toc: [], faqs: [], faqTitle: 'Frequently Asked Questions', faqDescription: '' }

    // Normalize non-breaking spaces and strip Google Docs blue colors and duplicate <u> tags
    const rawContent = blog.content
      .replace(/&nbsp;/g, ' ')
      .replace(/\u00A0/g, ' ')
      .replace(/color:\s*(rgb\(\s*17\s*,\s*85\s*,\s*204\s*\)|#1155cc)[;]?/gi, '')
      .replace(/<u>\s*(<a\b[^>]*>.*?<\/a>)\s*<\/u>/gi, '$1')
      .replace(/(<a\b[^>]*>)\s*<u>(.*?)<\/u>\s*(<\/a>)/gi, '$1$2$3')
      .trim()
    const isHtml = /<[a-z][\s\S]*>/i.test(rawContent)

    let htmlToProcess = rawContent

    if (!isHtml) {
      // Content is Markdown or plain text with newlines
      const lines = rawContent.split('\n')
      const htmlLines = []
      let inList = false
      let listType = null

      lines.forEach((line) => {
        const trimmed = line.trim()
        if (trimmed.startsWith('## ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<h2>${trimmed.replace('## ', '')}</h2>`)
        } else if (trimmed.startsWith('### ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<h3>${trimmed.replace('### ', '')}</h3>`)
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          if (!inList || listType !== 'ul') {
            if (inList) htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
            htmlLines.push('<ul>')
            inList = true
            listType = 'ul'
          }
          const text = trimmed.replace(/^[-*]\s+/, '')
          htmlLines.push(`<li>${text}</li>`)
        } else if (trimmed.match(/^\d+\.\s*/)) {
          if (!inList || listType !== 'ol') {
            if (inList) htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
            htmlLines.push('<ol>')
            inList = true
            listType = 'ol'
          }
          const text = trimmed.replace(/^\d+\.\s*/, '')
          htmlLines.push(`<li>${text}</li>`)
        } else if (trimmed.startsWith('> ')) {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          htmlLines.push(`<blockquote><p>${trimmed.replace('> ', '')}</p></blockquote>`)
        } else if (trimmed === '') {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
        } else {
          if (inList) { htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
          const formattedLine = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          htmlLines.push(`<p>${formattedLine}</p>`)
        }
      })
      if (inList) {
        htmlLines.push(listType === 'ul' ? '</ul>' : '</ol>')
      }
      htmlToProcess = htmlLines.join('\n')
    }

    // Extract Headings, wrap tables, and assign anchor IDs using DOMParser
    const headings = []
    let finalHtml = htmlToProcess
    let extractedFaqs = []
    let faqHeadingText = 'Frequently Asked Questions'
    let faqIntroDescription = ''

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlToProcess, 'text/html')
      const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

      headingElements.forEach((h, index) => {
        h.classList.remove('ql-align-justify')
        // Unwrap redundant strong/b tags inside headings to prevent extreme double-bolding
        const innerStrongs = h.querySelectorAll('strong, b')
        innerStrongs.forEach((s) => {
          while (s.firstChild) {
            s.parentNode.insertBefore(s.firstChild, s)
          }
          s.remove()
        })
        const text = h.textContent.trim()
        if (!text) return
        let id = h.getAttribute('id')
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || `section-${index + 1}`
          h.setAttribute('id', id)
        }
        // Include h2 and h3 in Table of Contents
        if (h.tagName.toLowerCase() === 'h2' || h.tagName.toLowerCase() === 'h3') {
          headings.push({
            id,
            title: text,
            level: h.tagName.toLowerCase()
          })
        }
      })

      // Ensure all anchor links have single #00A6FF underline, no redundant <u> or dark blue colors
      const links = doc.querySelectorAll('a')
      links.forEach((a) => {
        const href = a.getAttribute('href') || ''
        if (href.startsWith('http') || href.startsWith('//')) {
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noopener noreferrer')
        }
        // Unwrap redundant <u> parent to eliminate secondary blue underline
        if (a.parentElement && a.parentElement.tagName.toLowerCase() === 'u') {
          const u = a.parentElement
          u.parentNode.insertBefore(a, u)
          u.remove()
        }
        // Unwrap redundant <u> child
        const childU = a.querySelector('u')
        if (childU) {
          while (childU.firstChild) {
            childU.parentNode.insertBefore(childU.firstChild, childU)
          }
          childU.remove()
        }
        // Clean any parent style with Google Docs blue
        if (a.parentElement) {
          const pStyle = a.parentElement.getAttribute('style') || ''
          if (pStyle.includes('17, 85, 204') || pStyle.includes('#1155cc')) {
            a.parentElement.setAttribute('style', pStyle.replace(/color:\s*(rgb\(\s*17\s*,\s*85\s*,\s*204\s*\)|#1155cc)[;]?/gi, ''))
          }
        }
      })

      // Wrap tables in responsive wrapper and ensure header row has <th> and <thead>
      const tables = doc.querySelectorAll('table')
      tables.forEach((table) => {
        table.removeAttribute('style')

        // Check if table has thead; if not, promote the first row to thead with <th>
        let thead = table.querySelector('thead')
        if (!thead) {
          const firstRow = table.querySelector('tr')
          if (firstRow) {
            thead = doc.createElement('thead')
            firstRow.parentNode.insertBefore(thead, firstRow)
            thead.appendChild(firstRow)
            firstRow.querySelectorAll('td').forEach((td) => {
              const th = doc.createElement('th')
              th.innerHTML = td.innerHTML
              Array.from(td.attributes).forEach((attr) => th.setAttribute(attr.name, attr.value))
              th.classList.remove('ql-align-justify')
              td.parentNode.replaceChild(th, td)
            })
          }
        } else {
          thead.querySelectorAll('td').forEach((td) => {
            const th = doc.createElement('th')
            th.innerHTML = td.innerHTML
            Array.from(td.attributes).forEach((attr) => th.setAttribute(attr.name, attr.value))
            th.classList.remove('ql-align-justify')
            td.parentNode.replaceChild(th, td)
          })
        }

        // Clean any inline styles or conflicting classes from table cells and all their child tags
        table.querySelectorAll('th, td, tr, p, span, strong, b, div').forEach((el) => {
          el.removeAttribute('style')
          el.classList.remove('ql-align-justify')
        })

        if (!table.parentElement || !table.parentElement.classList.contains('blog-table-responsive')) {
          const wrapper = doc.createElement('div')
          wrapper.className = 'blog-table-responsive'
          table.parentNode.insertBefore(wrapper, table)
          wrapper.appendChild(table)
        }
      })

      // Clean up empty or whitespace-only paragraphs that create excessive gaps
      const paragraphs = doc.querySelectorAll('p')
      paragraphs.forEach((p) => {
        const text = p.textContent.replace(/[\u00A0\s]/g, '').trim()
        const hasMedia = p.querySelector('img, iframe, video, svg, table')
        if (!text && !hasMedia) {
          p.remove()
        }
      })

      // ─────────────────────────────────────────────────────────────────
      // SUPER-SMART FAQ DETECTION & EXTRACTION ENGINE
      // ─────────────────────────────────────────────────────────────────
      extractedFaqs = []
      faqHeadingText = 'Frequently Asked Questions'
      faqIntroDescription = ''

      // Helper regexes
      const FAQ_TITLE_REGEX = /^(?:[0-9]+[\.\)]\s*)?(?:frequently\s+asked\s*(?:questions?)?|faqs?|common\s+questions?|questions?\s*(?:&|and)\s*answers?|q\s*(?:&|and)\s*a)(?:\s+(?:about|regarding|on)\b.*|\s*\(.*?\))?[\s:.-]*$/i
      const IS_QUESTION_WORDS = /^(?:what|how|why|when|where|who|which|can|could|is|are|do|does|will|should|would|did|has|have)\b/i
      const QUESTION_PREFIX_REGEX = /^(?:(?:Q\d*|Question\s*\d*)[:.]\s*|\d+[\.\)]\s*|[-*•]\s*)/i
      const ANSWER_PREFIX_REGEX = /^(?:(?:A|Ans|Answer)[:.]\s*)/i

      // 1. Locate the FAQ section start element (Check headings first, then paragraphs, divs, etc.)
      const candidateElements = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, blockquote'))
      const faqHeaderEl = candidateElements.find((el) => {
        const rawTxt = (el.textContent || '').trim()
        if (!rawTxt || rawTxt.length > 120) return false

        // Exact or fuzzy FAQ heading match
        if (FAQ_TITLE_REGEX.test(rawTxt)) return true

        // Check if an inner <strong> or <b> contains the FAQ heading
        const strong = el.querySelector('strong, b')
        if (strong) {
          const strongTxt = strong.textContent.trim()
          if (FAQ_TITLE_REGEX.test(strongTxt) && strongTxt.length < 100) return true
        }

        // Fuzzy fallback for "frequently asked" or standalone "faq"/"faqs"
        const lower = rawTxt.toLowerCase()
        return (
          (lower.includes('frequently asked') || lower === 'faq' || lower === 'faqs' || lower.startsWith('faqs:')) &&
          rawTxt.length < 90
        )
      })

      if (faqHeaderEl) {
        faqHeadingText = (faqHeaderEl.textContent || '').trim() || 'Frequently Asked Questions'
        const nodesToRemove = [faqHeaderEl]
        const removedHeadingIds = new Set()
        if (faqHeaderEl.getAttribute('id')) {
          removedHeadingIds.add(faqHeaderEl.getAttribute('id'))
        }

        let curr = faqHeaderEl.nextElementSibling
        let currQ = null
        let currA = []

        const cleanQuestion = (qStr) => {
          if (!qStr) return ''
          return qStr
            .replace(QUESTION_PREFIX_REGEX, '')
            .replace(/\s+/g, ' ')
            .trim()
        }

        const cleanAnswer = (aStr) => {
          if (!aStr) return ''
          return aStr
            .replace(ANSWER_PREFIX_REGEX, '')
            .trim()
        }

        const flushCurrentFaq = () => {
          if (currQ) {
            const finalAns = currA.filter(Boolean).join('\n\n').trim()
            if (finalAns) {
              extractedFaqs.push({
                id: `blog-faq-${extractedFaqs.length + 1}`,
                num: String(extractedFaqs.length + 1).padStart(2, '0'),
                question: cleanQuestion(currQ),
                answer: cleanAnswer(finalAns)
              })
            }
          }
          currQ = null
          currA = []
        }

        // Helper to test if text looks like a question
        const isQuestionLike = (txt) => {
          if (!txt) return false
          const trimmed = txt.trim()
          if (trimmed.length > 300) return false
          if (trimmed.endsWith('?')) return true
          if (/^(?:Q\d*|Question\s*\d*)[:.]/i.test(trimmed)) return true
          if (/^\d+[\.\)]\s*/.test(trimmed) && (trimmed.endsWith('?') || IS_QUESTION_WORDS.test(trimmed.replace(/^\d+[\.\)]\s*/, '')))) return true
          return false
        }

        // Helper to check if a major heading is a section terminator (e.g. Conclusion, Summary)
        const isMajorSectionTerminator = (el) => {
          const tag = el.tagName.toLowerCase()
          const txt = (el.textContent || '').trim()
          // Empty headings or tags are NEVER terminators!
          if (!txt) return false

          if (tag === 'h1') return true
          if (tag === 'h2') {
            // If it's an H2 that looks like a question, it's NOT a terminator
            if (isQuestionLike(txt)) return false
            return true
          }
          return false
        }

        while (curr) {
          // Check for section termination
          if (isMajorSectionTerminator(curr)) {
            break
          }

          nodesToRemove.push(curr)
          if (curr.getAttribute('id')) {
            removedHeadingIds.add(curr.getAttribute('id'))
          }

          const tag = curr.tagName.toLowerCase()
          const text = (curr.textContent || '').trim()

          // Skip empty nodes (e.g. empty <h2></h2>, <p><br></p>)
          if (!text && !curr.querySelector('img, iframe, svg, table')) {
            curr = curr.nextElementSibling
            continue
          }

          // ── Case A: List of FAQs (<ol> or <ul>) ──
          if (tag === 'ol' || tag === 'ul') {
            const listItems = Array.from(curr.querySelectorAll('li'))
            listItems.forEach((li) => {
              const strong = li.querySelector('strong, b')
              const liText = li.textContent.trim()

              // Sub-case A1: Question is inside <strong>/<b>
              if (strong && strong.textContent.trim().length > 3) {
                const sText = strong.textContent.trim()
                const restText = liText.slice(liText.indexOf(sText) + sText.length).replace(/^[\s:–—-]+/, '').trim()
                if (restText) {
                  flushCurrentFaq()
                  extractedFaqs.push({
                    id: `blog-faq-${extractedFaqs.length + 1}`,
                    num: String(extractedFaqs.length + 1).padStart(2, '0'),
                    question: cleanQuestion(sText),
                    answer: cleanAnswer(restText)
                  })
                  return
                }
              }

              // Sub-case A2: Delimited by "?" or "A:" / "Answer:"
              const qSplitMatch = liText.match(/^(.*?[\?])\s*(?:(?:A|Ans|Answer)[:.]\s*|\s*[-–—]\s*)?(.*)$/is)
              if (qSplitMatch && qSplitMatch[1] && qSplitMatch[2]) {
                flushCurrentFaq()
                extractedFaqs.push({
                  id: `blog-faq-${extractedFaqs.length + 1}`,
                  num: String(extractedFaqs.length + 1).padStart(2, '0'),
                  question: cleanQuestion(qSplitMatch[1]),
                  answer: cleanAnswer(qSplitMatch[2])
                })
                return
              }

              // Sub-case A3: Regular list item text
              if (isQuestionLike(liText)) {
                flushCurrentFaq()
                currQ = liText
              } else if (currQ) {
                currA.push(liText)
              }
            })
            curr = curr.nextElementSibling
            continue
          }

          // ── Case B: Heading Question (H2, H3, H4, H5, H6) ──
          const isHeading = ['h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
          if (isHeading && (isQuestionLike(text) || currQ === null)) {
            flushCurrentFaq()
            currQ = text
            curr = curr.nextElementSibling
            continue
          }

          // ── Case C: Paragraph or Div with <strong>/<b> ──
          const strongTag = curr.querySelector('strong, b')
          if (strongTag) {
            const strongText = strongTag.textContent.trim()
            const fullText = text

            const strongIsQuestion = isQuestionLike(strongText)
            const wholeIsQuestion = isQuestionLike(fullText) && fullText.length <= strongText.length + 5

            if (strongIsQuestion || wholeIsQuestion) {
              const qPart = strongIsQuestion ? strongText : fullText
              const aPart =
                strongIsQuestion && fullText.length > strongText.length
                  ? fullText.slice(fullText.indexOf(strongText) + strongText.length).replace(/^[\s:–—-]+/, '').trim()
                  : ''

              if (aPart) {
                // Question and answer exist together in this single paragraph!
                flushCurrentFaq()
                extractedFaqs.push({
                  id: `blog-faq-${extractedFaqs.length + 1}`,
                  num: String(extractedFaqs.length + 1).padStart(2, '0'),
                  question: cleanQuestion(qPart),
                  answer: cleanAnswer(aPart)
                })
              } else {
                // Question is in this paragraph, answer will follow
                flushCurrentFaq()
                currQ = qPart
              }
              curr = curr.nextElementSibling
              continue
            }
          }

          // ── Case D: Paragraph with Q: and A: pattern ──
          const qaMatch = text.match(/^(?:(?:Q\d*|Question\s*\d*)[:.]\s*|\d+[\.\)]\s*)(.*?[\?])\s*(?:(?:A|Ans|Answer)[:.]\s*|\s*[-–—]\s*)?(.*)$/is)
          if (qaMatch && qaMatch[1] && qaMatch[2]) {
            flushCurrentFaq()
            extractedFaqs.push({
              id: `blog-faq-${extractedFaqs.length + 1}`,
              num: String(extractedFaqs.length + 1).padStart(2, '0'),
              question: cleanQuestion(qaMatch[1]),
              answer: cleanAnswer(qaMatch[2])
            })
            curr = curr.nextElementSibling
            continue
          }

          // ── Case E: Paragraph ending with '?' without strong tag ──
          if (isQuestionLike(text) && text.length < 200) {
            flushCurrentFaq()
            currQ = text
            curr = curr.nextElementSibling
            continue
          }

          // ── Case F: Answer Content (text or nested list) ──
          if (currQ) {
            if (curr.querySelector('ul, ol')) {
              const bullets = Array.from(curr.querySelectorAll('li'))
                .map((li) => `• ${li.textContent.trim()}`)
                .join('\n')
              if (bullets) currA.push(bullets)
            } else if (text) {
              currA.push(text)
            }
          } else {
            // Intro text between FAQ title and the first question
            if (!faqIntroDescription && text && text.length < 300) {
              faqIntroDescription = text
            }
          }

          curr = curr.nextElementSibling
        }

        // Flush any remaining question
        flushCurrentFaq()

        // If we found FAQs, remove all captured raw FAQ nodes from the article body!
        if (extractedFaqs.length > 0) {
          nodesToRemove.forEach((n) => {
            if (n && n.parentNode) {
              n.parentNode.removeChild(n)
            }
          })

          // Clean Table of Contents: remove removed heading IDs and question titles
          const cleanedHeadings = headings.filter((h) => {
            if (removedHeadingIds.has(h.id)) return false
            const isFaqQ = extractedFaqs.some(
              (f) =>
                f.question.toLowerCase().includes(h.title.toLowerCase()) ||
                h.title.toLowerCase().includes(f.question.toLowerCase())
            )
            return !isFaqQ
          })

          headings.length = 0
          headings.push(...cleanedHeadings)
        }
      }

      // Ensure Table of Contents includes an entry for the FAQ section
      const hasFaqInToc = headings.some((h) => /faq|frequently asked/i.test(h.title))
      if (!hasFaqInToc) {
        headings.push({
          id: 'faq',
          title: faqHeadingText,
          level: 'h2'
        })
      }

      finalHtml = doc.body.innerHTML
    } catch (e) {
      console.warn('Error parsing article headings and tables:', e)
    }

    const sanitizedHtml = DOMPurify.sanitize(finalHtml, {
      ADD_TAGS: ['iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div'],
      ADD_ATTR: ['target', 'id', 'class', 'style', 'href', 'src', 'alt', 'width', 'height', 'frameborder', 'allowfullscreen', 'rel']
    })

    return {
      html: sanitizedHtml,
      toc: headings,
      faqs: extractedFaqs,
      faqTitle: faqHeadingText,
      faqDescription: faqIntroDescription
    }
  }, [blog?.content])

  const tableOfContents = processedArticle.toc

  // Handle smooth scroll when clicking any Table of Contents link
  const handleTocClick = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    isManualClickScrollingRef.current = true
    setActiveSection(id)

    // Smoothly scroll active item into view inside the TOC sidebar
    if (tocNavRef.current) {
      const itemEl = tocNavRef.current.querySelector(`[data-toc-id="${id}"]`)
      if (itemEl) {
        const targetScroll = itemEl.offsetTop - (tocNavRef.current.clientHeight / 2) + (itemEl.offsetHeight / 2)
        tocNavRef.current.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        })
      }
    }

    const offset = 100
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const offsetPosition = elementRect - bodyRect - offset

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(offsetPosition, {
        duration: 0.9,
        onComplete: () => {
          setTimeout(() => {
            isManualClickScrollingRef.current = false
          }, 100)
        }
      })
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setTimeout(() => {
        isManualClickScrollingRef.current = false
      }, 800)
    }
  }, [])

  // Synchronized simultaneous scroll listener: tracks reading position & scrolls TOC in unison
  useEffect(() => {
    if (tableOfContents.length === 0) return

    let rafId = null

    const updateScrollAndToc = () => {
      const articleEl = articleContainerRef.current
      if (!articleEl) return

      const headingElements = tableOfContents
        .map((item) => ({
          id: item.id,
          el: document.getElementById(item.id)
        }))
        .filter((h) => h.el !== null)

      if (headingElements.length === 0) return

      const scrollY = window.scrollY
      const NAVBAR_OFFSET = 120

      // Overall article reading progress
      const articleRect = articleEl.getBoundingClientRect()
      const articleTop = articleRect.top + scrollY
      const articleHeight = articleEl.offsetHeight
      const scrollFromArticleTop = scrollY + NAVBAR_OFFSET - articleTop
      const progress = Math.max(0, Math.min(1, scrollFromArticleTop / Math.max(1, articleHeight)))
      setArticleProgress(progress)

      // Identify active heading and interpolation fraction
      const isBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 140
      let activeIdx = 0
      let sectionFraction = 0

      if (isBottom) {
        activeIdx = headingElements.length - 1
        sectionFraction = 1
      } else {
        for (let i = 0; i < headingElements.length; i++) {
          const headingRect = headingElements[i].el.getBoundingClientRect()
          if (headingRect.top <= NAVBAR_OFFSET + 30) {
            activeIdx = i
          } else {
            break
          }
        }

        const currentHeadingEl = headingElements[activeIdx].el
        const nextHeadingEl = headingElements[activeIdx + 1]?.el

        if (nextHeadingEl) {
          const currentTop = currentHeadingEl.getBoundingClientRect().top
          const nextTop = nextHeadingEl.getBoundingClientRect().top
          const dist = nextTop - currentTop
          if (dist > 0) {
            sectionFraction = Math.max(0, Math.min(1, (NAVBAR_OFFSET - currentTop) / dist))
          }
        }
      }

      const activeId = headingElements[activeIdx].id
      setActiveSection(activeId)

      // Simultaneous synchronized scrolling of the TOC container
      if (!isManualClickScrollingRef.current && !isHoveringTocRef.current && tocNavRef.current) {
        const container = tocNavRef.current
        const maxScroll = container.scrollHeight - container.clientHeight

        if (maxScroll > 0) {
          const currentItemEl = container.querySelector(`[data-toc-id="${activeId}"]`)
          const nextItemEl = headingElements[activeIdx + 1]
            ? container.querySelector(`[data-toc-id="${headingElements[activeIdx + 1].id}"]`)
            : null

          let targetScrollTop = 0
          if (currentItemEl) {
            const currentCenter = currentItemEl.offsetTop + currentItemEl.offsetHeight / 2
            let focalPoint = currentCenter

            if (nextItemEl && sectionFraction > 0) {
              const nextCenter = nextItemEl.offsetTop + nextItemEl.offsetHeight / 2
              focalPoint = currentCenter + sectionFraction * (nextCenter - currentCenter)
            }

            targetScrollTop = focalPoint - container.clientHeight / 2
          } else {
            targetScrollTop = progress * maxScroll
          }

          container.scrollTop = Math.max(0, Math.min(maxScroll, targetScrollTop))
        }
      }
    }

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        updateScrollAndToc()
      })
    }

    // Initial update
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll)
      }
    }
  }, [tableOfContents, handleTocClick])

  // Estimated read time
  const estimateReadTime = (content) => {
    if (!content) return '5 min read'
    const words = content.trim().split(/\s+/).length
    const minutes = Math.max(3, Math.ceil(words / 200))
    return `${minutes} min read`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently Published'
    if (typeof dateString === 'string') {
      const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/)
      if (match) {
        const year = parseInt(match[1], 10)
        const month = parseInt(match[2], 10) - 1
        const day = parseInt(match[3], 10)
        const d = new Date(year, month, day)
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      }
    }
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? 'Recently Published' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const featuredImg =
    blog?.featured_image ||
    blog?.image ||
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'

  // Schema Markup
  const faqsForSchema =
    processedArticle?.faqs?.length > 0 ? processedArticle.faqs : DEFAULT_BLOG_FAQS
  const faqSchema =
    faqsForSchema?.length > 0
      ? {
        '@type': 'FAQPage',
        '@id': `https://tarajglobal.com/blog/${slug}#faq`,
        mainEntity: faqsForSchema.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      }
      : null

  const articleSchema = blog
    ? {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.excerpt || blog.title,
          image: featuredImg,
          datePublished: blog.published_at || blog.created_at || new Date().toISOString(),
          dateModified: blog.updated_at || blog.published_at || blog.created_at || new Date().toISOString(),
          author: {
            '@type': 'Person',
            name: formatAuthorName(blog.author_name || blog.author)
          },
          publisher: {
            '@type': 'Organization',
            name: 'Taraj Global',
            url: 'https://tarajglobal.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://tarajglobal.com/OnlyTG-%203.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://tarajglobal.com/blog/${slug}`
          }
        },
        ...(faqSchema ? [faqSchema] : [])
      ]
    }
    : null

  // ── LOADING STATE ──
  if (loading) {
    const formattedSlugTitle = slug
      ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      : 'Article'

    return (
      <>
        <SEO
          title={`${formattedSlugTitle} | Taraj Global`}
          description="Read this insightful B2B demand generation and pipeline growth article from Taraj Global."
          canonical={`/blog/${slug || ''}`}
        />
        <div className="min-h-screen bg-background pt-10 pb-20">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
              <div className="h-5 bg-slate-200 dark:bg-white/10 rounded w-1/4" />
              <div className="h-12 bg-slate-200 dark:bg-white/10 rounded-2xl w-4/5" />
              <div className="h-6 bg-slate-200 dark:bg-white/10 rounded w-1/2" />
              <div className="h-80 bg-slate-200 dark:bg-white/10 rounded-3xl w-full" />
              <div className="space-y-3 pt-6">
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-full" />
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-5/6" />
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
              </div>
            </div>
          </Container>
        </div>
      </>
    )
  }

  // ── ERROR OR NOT FOUND ──
  if (error || !blog) {
    return (
      <>
        <SEO title="Playbook Not Found | Taraj Global" noIndex={true} />
        <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4 text-center">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 max-w-md w-full">
            <h2 className="text-2xl font-bold text-text-primary dark:text-text-primary dark:text-white mb-2">
              Article Not Found
            </h2>
            <p className="text-sm text-text-secondary dark:text-[#A7ADB7] mb-6">
              {error || 'The B2B marketing playbook you are looking for has been archived or moved.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00A6FF] text-white text-xs font-bold hover:bg-[#0088D6] transition-colors cursor-pointer shadow-md shadow-[#00A6FF]/25"
            >
              <ArrowLeft size={15} />
              <span>Back to Knowledge Hub</span>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title={blog.seo_title || blog.meta_title || blog.title}
        isFromCMS={Boolean(blog.seo_title || blog.meta_title)}
        description={blog.seo_description || blog.meta_description || blog.excerpt || blog.title}
        keywords={blog.seo_keywords || blog.meta_keywords || blog.keywords || `${blog.title}, B2B demand generation, ABM insights, Taraj Global`}
        canonical={blog.canonical_url || `/blog/${blog.slug || slug}`}
        ogTitle={blog.og_title || blog.seo_title || blog.title}
        ogDescription={blog.og_description || blog.seo_description || blog.excerpt || blog.title}
        ogImage={blog.og_image || featuredImg}
        twitterTitle={blog.twitter_title || blog.og_title || blog.seo_title || blog.title}
        twitterDescription={blog.twitter_description || blog.og_description || blog.seo_description || blog.excerpt || blog.title}
        twitterImage={blog.twitter_image || blog.og_image || featuredImg}
        robots={blog.robots || 'index, follow'}
        ogType="article"
        schemaJson={articleSchema}
      />

      {/* ── STICKY READING PROGRESS BAR ───────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00A6FF] via-[#00E5FF] to-[#FF6D00] origin-left z-50 shadow-xs"
        style={{ scaleX }}
      />

      <div className="bg-background min-h-screen text-text-primary transition-colors duration-300 pb-20">
        {/* ── PREVIEW MODE BANNER ── */}
        {new URLSearchParams(window.location.search).get('preview') === 'true' && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-500 dark:text-amber-400 py-3 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2 sticky top-nav z-30 backdrop-blur-md">
            <Eye size={16} />
            <span>Admin Preview Mode &bull; Status: <strong className="uppercase">{blog?.status || 'Draft'}</strong></span>
          </div>
        )}

        {/* ── TOP BREADCRUMB ─────────────────────────── */}
        <section className="pt-8 pb-6 lg:pt-10 border-b border-slate-200/80 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
          <Container>
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
                <Link to="/" className="hover:text-text-accent transition-colors">
                  Home
                </Link>
                <ChevronRight size={12} />
                <Link to="/blog" className="hover:text-text-accent transition-colors">
                  Blog
                </Link>
                <ChevronRight size={12} />
                <span className="text-text-primary dark:text-text-primary dark:text-white font-semibold truncate max-w-[250px]">
                  {blog.category_name || 'Playbook'}
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* ── ARTICLE HERO SECTION ─────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Category Pill & Read Meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] ">
                  {blog.category_name || 'B2B Strategy'}
                </span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Clock size={13} className="text-[#FF6D00]" />
                  <span>{estimateReadTime(blog.content)}</span>
                </span>
                <span className="text-xs font-mono text-text-tertiary hidden sm:inline">•</span>
                <span className="text-xs font-mono text-text-tertiary flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#00A6FF]" />
                  <span>{formatDate(blog.published_at || blog.created_at)}</span>
                </span>
              </div>

              {/* Article Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-left text-text-primary dark:text-text-primary dark:text-white leading-[1.22]">
                {blog.title}
              </h1>

              {/* Article Subtitle Excerpt */}
              {blog.excerpt && (
                <p className="text-sm sm:text-base lg:text-lg text-text-secondary dark:text-[#A7ADB7] leading-relaxed font-normal">
                  {blog.excerpt}
                </p>
              )}

              {/* Author Strip */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {blog.author_photo ? (
                    <img
                      src={mediaUrl(blog.author_photo)}
                      alt={formatAuthorName(blog.author_name || blog.author)}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex'
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-[#00A6FF]/40 shadow-xs"
                    />
                  ) : null}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#00A6FF] to-[#007AC0] text-text-primary dark:text-white flex items-center justify-center font-bold text-sm shadow-xs ${blog.author_photo ? 'hidden' : 'flex'}`}>
                    {(formatAuthorName(blog.author_name || blog.author) || 'T').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary dark:text-text-primary dark:text-white flex items-center gap-2">
                      <span>{formatAuthorName(blog.author_name || blog.author)}</span>
                      {/* Quick social links next to author name */}
                      {(blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url) && (
                        <a
                          href={
                            (blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url).startsWith('http')
                              ? (blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url)
                              : `https://${blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B5] hover:opacity-80 transition-opacity p-0.5"
                          title="LinkedIn Profile"
                        >
                          <Linkedin size={13} />
                        </a>
                      )}
                      {(blog.author_twitter || blog.author_twitter_url || blog.twitter_url) && (
                        <a
                          href={
                            (blog.author_twitter || blog.author_twitter_url || blog.twitter_url).startsWith('http')
                              ? (blog.author_twitter || blog.author_twitter_url || blog.twitter_url)
                              : `https://${blog.author_twitter || blog.author_twitter_url || blog.twitter_url}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 dark:text-slate-300 hover:opacity-80 transition-opacity p-0.5"
                          title="Twitter / X Profile"
                        >
                          <Twitter size={13} />
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-text-tertiary font-mono">
                      {blog.author_designation || 'B2B Revenue Architecture'}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Peer-Reviewed Strategy</span>
                  </span>
                </div>
              </div>

              {/* Featured Cover Image - 100% Clear & Visible */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] my-6 sm:my-8 bg-slate-900">
                <img
                  src={mediaUrl(featuredImg)}
                  alt={blog.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=700&fit=crop&q=80'
                  }}
                  className="w-full h-auto max-h-[520px] aspect-[16/9] object-cover object-center"
                />
              </div>

            </div>
          </Container>
        </section>

        {/* ── 2-COLUMN MAIN CONTENT & SIDEBAR ──────────────────────── */}
        <section className="pb-16">
          <Container>
            <div className={`max-w-6xl mx-auto ${tableOfContents.length > 0 ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start' : 'max-w-4xl'}`}>

              {/* LEFT / CENTER: MAIN ARTICLE CONTENT */}
              <div className={tableOfContents.length > 0 ? 'lg:col-span-8' : 'w-full'}>
                {/* Mobile Collapsible Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="lg:hidden mb-6 p-4 sm:p-5 rounded-2xl bg-surface border border-slate-200/90 dark:border-white/10 shadow-xs">
                    <details
                      className="group"
                      open={mobileTocOpen}
                      onToggle={(e) => setMobileTocOpen(e.currentTarget.open)}
                    >
                      <summary className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-text-primary cursor-pointer list-none select-none">
                        <span className="flex items-center gap-2">
                          <ListFilter size={15} className="text-[#00A6FF]" />
                          <span>TABLE OF CONTENTS ({tableOfContents.length})</span>
                        </span>
                        <span className="text-[#00A6FF] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      {activeSection && (
                        <div className="mt-2 text-[11px] text-[#00A6FF] font-mono flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF] shrink-0 animate-pulse"></span>
                          <span className="truncate">
                            Current: {tableOfContents.find((t) => t.id === activeSection)?.title || activeSection}
                          </span>
                        </div>
                      )}
                      <nav className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 space-y-1 max-h-60 overflow-y-auto toc-scrollbar">
                        {tableOfContents.map((item, idx) => {
                          const isActive = activeSection === item.id
                          const isH3 = item.level === 'h3'
                          return (
                            <a
                              key={`mobile-toc-${item.id || idx}`}
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault()
                                handleTocClick(item.id)
                                setMobileTocOpen(false)
                              }}
                              className={`block text-xs py-1.5 px-2.5 rounded-lg transition-colors leading-snug font-medium cursor-pointer ${
                                isActive
                                  ? 'bg-[#00A6FF]/10 text-[#00A6FF] font-semibold border-l-2 border-[#00A6FF]'
                                  : 'text-text-secondary dark:text-[#A7ADB7] hover:text-[#00A6FF]'
                              } ${isH3 ? 'pl-5 text-[11px]' : ''}`}
                            >
                              <span className="font-mono text-[10px] text-text-tertiary mr-2">0{idx + 1}.</span>
                              {item.title}
                            </a>
                          )
                        })}
                      </nav>
                    </details>
                  </div>
                )}

                <article ref={articleContainerRef} className="prose prose-slate dark:prose-invert max-w-none">

                  {/* Executive Key Takeaway Card */}
                  <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 mb-8 shadow-xs not-prose">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A6FF] mb-2.5">
                      <Target size={14} />
                      <span>EXECUTIVE SUMMARY // CORE PLAYBOOK TAKEAWAYS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary dark:text-[#A7ADB7] leading-relaxed">
                      {blog.excerpt || 'This playbook details real-world B2B demand generation architectures, qualification criteria, and cold engagement cadences proven across high-growth enterprise pipelines.'}
                    </p>
                  </div>

                  {/* Formatted Article Body */}
                  <div className="blog-article-content text-text-primary dark:text-slate-200 leading-relaxed font-normal">
                    <style>{`
                      .blog-article-content {
                        font-size: 1.0625rem;
                        line-height: 1.65;
                        color: #cbd5e1;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content p {
                        margin-top: 0;
                        margin-bottom: 1.125rem;
                        line-height: 1.65;
                        color: #cbd5e1;
                        text-align: left;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content p:empty,
                      .blog-article-content p:blank {
                        display: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        height: 0 !important;
                      }
                      /* Only body text / paragraphs justify; Headings NEVER justify */
                      .blog-article-content p.ql-align-justify,
                      .blog-article-content div.ql-align-justify {
                        text-align: justify !important;
                        text-justify: auto !important;
                        text-align-last: left !important;
                        word-spacing: normal !important;
                      }
                      .blog-article-content h1,
                      .blog-article-content h2,
                      .blog-article-content h3,
                      .blog-article-content h4,
                      .blog-article-content h5,
                      .blog-article-content h6,
                      .blog-article-content h1.ql-align-justify,
                      .blog-article-content h2.ql-align-justify,
                      .blog-article-content h3.ql-align-justify,
                      .blog-article-content h4.ql-align-justify,
                      .blog-article-content h5.ql-align-justify,
                      .blog-article-content h6.ql-align-justify {
                        text-align: left !important;
                        text-justify: none !important;
                        word-spacing: normal !important;
                      }
                      .blog-article-content .ql-align-center,
                      .blog-article-content p.ql-align-center,
                      .blog-article-content h1.ql-align-center,
                      .blog-article-content h2.ql-align-center,
                      .blog-article-content h3.ql-align-center {
                        text-align: center !important;
                      }
                      .blog-article-content .ql-align-right,
                      .blog-article-content p.ql-align-right,
                      .blog-article-content h1.ql-align-right,
                      .blog-article-content h2.ql-align-right,
                      .blog-article-content h3.ql-align-right {
                        text-align: right !important;
                      }
                      .blog-article-content .ql-align-left,
                      .blog-article-content p.ql-align-left,
                      .blog-article-content h1.ql-align-left,
                      .blog-article-content h2.ql-align-left,
                      .blog-article-content h3.ql-align-left {
                        text-align: left !important;
                      }
                      .blog-article-content span,
                      .blog-article-content a,
                      .blog-article-content strong,
                      .blog-article-content em,
                      .blog-article-content b,
                      .blog-article-content i,
                      .blog-article-content li {
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h1 {
                        font-size: 2.125rem;
                        font-weight: 700 !important;
                        line-height: 1.28;
                        letter-spacing: -0.02em;
                        margin-top: 2.5rem;
                        margin-bottom: 1.25rem;
                        color: #ffffff;
                        font-synthesis: none !important;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h1 strong,
                      .blog-article-content h1 b {
                        font-weight: 700 !important;
                      }
                      .blog-article-content h2 {
                        font-size: 1.65rem;
                        font-weight: 700 !important;
                        line-height: 1.35;
                        letter-spacing: -0.015em;
                        margin-top: 2.25rem;
                        margin-bottom: 1rem;
                        color: #ffffff;
                        padding-top: 1.25rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        scroll-margin-top: 6rem;
                        font-synthesis: none !important;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h2 strong,
                      .blog-article-content h2 b {
                        font-weight: 700 !important;
                      }
                      .blog-article-content h3 {
                        font-size: 1.35rem;
                        font-weight: 600 !important;
                        line-height: 1.4;
                        letter-spacing: -0.015em;
                        margin-top: 2rem;
                        margin-bottom: 0.75rem;
                        color: #f1f5f9;
                        scroll-margin-top: 6rem;
                        font-synthesis: none !important;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content h3 strong,
                      .blog-article-content h3 b {
                        font-weight: 600 !important;
                      }
                      .blog-article-content h4 {
                        font-size: 1.15rem;
                        font-weight: 600;
                        line-height: 1.45;
                        margin-top: 1.5rem;
                        margin-bottom: 0.5rem;
                        color: #f1f5f9;
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content strong,
                      .blog-article-content b {
                        font-weight: 700;
                        color: #ffffff;
                      }
                      .blog-article-content em,
                      .blog-article-content i {
                        font-style: italic;
                      }
                      /* Unordered / Bullet Lists */
                      .blog-article-content ul {
                        list-style-type: disc !important;
                        margin: 1rem 0 1.5rem 0 !important;
                        padding-left: 1.75rem !important;
                      }
                      .blog-article-content ul li {
                        list-style-type: disc !important;
                        margin-bottom: 0.625rem;
                        line-height: 1.75;
                        color: #cbd5e1;
                      }
                      /* Ordered Lists */
                      .blog-article-content ol {
                        list-style-type: decimal !important;
                        margin: 1rem 0 1.5rem 0 !important;
                        padding-left: 1.75rem !important;
                      }
                      .blog-article-content ol li {
                        list-style-type: decimal !important;
                        margin-bottom: 0.625rem;
                        line-height: 1.75;
                        color: #cbd5e1;
                      }
                      /* Hyperlinks: ONLY ONE #00A6FF UNDERLINE */
                      .blog-article-content a {
                        color: #00A6FF !important;
                        text-decoration: underline !important;
                        text-decoration-color: #00A6FF !important;
                        text-decoration-thickness: 1.5px;
                        text-underline-offset: 3px;
                        font-weight: 500;
                        transition: opacity 0.2s ease, text-shadow 0.2s ease;
                        display: inline;
                      }
                      .blog-article-content a:hover {
                        opacity: 0.85;
                        text-shadow: 0 0 10px rgba(0, 166, 255, 0.45);
                      }
                      /* Remove any secondary underline from nested or parent tags */
                      .blog-article-content a *,
                      .blog-article-content a u,
                      .blog-article-content u:has(a),
                      .blog-article-content em:has(a),
                      .blog-article-content span:has(a) {
                        text-decoration: none !important;
                        color: #00A6FF !important;
                      }
                      /* Blockquotes */
                      .blog-article-content blockquote {
                        margin: 1.75rem 0;
                        padding: 1.25rem 1.5rem;
                        border-left: 4px solid #00A6FF;
                        background: rgba(0, 166, 255, 0.05);
                        border-radius: 0 1rem 1rem 0;
                        color: #e2e8f0;
                        font-style: italic;
                      }
                      .blog-article-content blockquote p {
                        margin-bottom: 0;
                      }
                      /* Tables & Responsive Wrapper */
                      .blog-article-content .blog-table-responsive {
                        width: 100%;
                        overflow-x: auto;
                        -webkit-overflow-scrolling: touch;
                        margin: 2.25rem 0;
                        border-radius: 1rem;
                        border: 1px solid rgba(0, 166, 255, 0.28);
                        background: #080d1a;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 166, 255, 0.05);
                      }
                      .blog-article-content table {
                        width: 100%;
                        min-width: 640px;
                        border-collapse: separate;
                        border-spacing: 0;
                        margin: 0 !important;
                        border: none !important;
                      }
                      .blog-article-content thead {
                        background: linear-gradient(180deg, #0f1d33 0%, #0a1424 100%);
                        border-bottom: 2px solid #00A6FF;
                      }
                      .blog-article-content th {
                        background: #0d182b;
                        color: #00A6FF !important;
                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        font-weight: 800 !important;
                        font-size: 0.8125rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.1em !important;
                        padding: 14px 18px;
                        text-align: left;
                        vertical-align: middle;
                        border-bottom: 2px solid #00A6FF;
                        border-right: 1px solid rgba(255, 255, 255, 0.08);
                        white-space: nowrap;
                      }
                      .blog-article-content th * {
                        color: #00A6FF !important;
                        font-weight: 800 !important;
                        font-size: 0.8125rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.1em !important;
                      }
                      .blog-article-content th:last-child {
                        border-right: none;
                      }
                      .blog-article-content td {
                        padding: 14px 18px;
                        text-align: left;
                        vertical-align: top;
                        font-size: 0.875rem !important;
                        line-height: 1.65;
                        color: #cbd5e1;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        border-right: 1px solid rgba(255, 255, 255, 0.06);
                        word-break: normal !important;
                        overflow-wrap: break-word !important;
                      }
                      .blog-article-content td * {
                        font-size: 0.875rem !important;
                        line-height: 1.65;
                      }
                      .blog-article-content td:last-child {
                        border-right: none;
                      }
                      /* Distinct First Column (e.g. Layer / Entity name) */
                      .blog-article-content tbody tr td:first-child {
                        font-weight: 700 !important;
                        color: #ffffff !important;
                        background: rgba(0, 166, 255, 0.05);
                        border-right: 1px solid rgba(0, 166, 255, 0.15);
                      }
                      .blog-article-content tbody tr td:first-child * {
                        font-weight: 700 !important;
                        color: #ffffff !important;
                      }
                      .blog-article-content tbody tr:nth-child(even) td {
                        background-color: rgba(11, 20, 36, 0.65);
                      }
                      .blog-article-content tbody tr:nth-child(even) td:first-child {
                        background-color: rgba(13, 24, 43, 0.8);
                      }
                      .blog-article-content tbody tr:nth-child(odd) td {
                        background-color: rgba(15, 23, 42, 0.35);
                      }
                      .blog-article-content tbody tr:nth-child(odd) td:first-child {
                        background-color: rgba(15, 23, 42, 0.55);
                      }
                      .blog-article-content tbody tr:last-child td {
                        border-bottom: none;
                      }
                      .blog-article-content tbody tr:hover td {
                        background-color: rgba(0, 166, 255, 0.12) !important;
                        color: #ffffff;
                      }
                      /* Light mode adjustments */
                      html:not(.dark) .blog-article-content {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content p {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content h1,
                      html:not(.dark) .blog-article-content h2,
                      html:not(.dark) .blog-article-content h3,
                      html:not(.dark) .blog-article-content h4,
                      html:not(.dark) .blog-article-content strong {
                        color: #0f172a;
                      }
                      html:not(.dark) .blog-article-content ul li,
                      html:not(.dark) .blog-article-content ol li {
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content a {
                        color: #007bb5 !important;
                      }
                      html:not(.dark) .blog-article-content blockquote {
                        border-left-color: #00A6FF;
                        background: rgba(0, 166, 255, 0.06);
                        color: #1e293b;
                      }
                      html:not(.dark) .blog-article-content .blog-table-responsive {
                        background: #ffffff;
                        border: 1px solid #cbd5e1;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
                      }
                      html:not(.dark) .blog-article-content thead,
                      html:not(.dark) .blog-article-content th {
                        background: #f1f5f9;
                        color: #0284c7 !important;
                        border-bottom: 2px solid #00A6FF;
                        border-right-color: #e2e8f0;
                      }
                      html:not(.dark) .blog-article-content th * {
                        color: #0284c7 !important;
                        font-weight: 800 !important;
                        font-size: 0.8125rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.1em !important;
                      }
                      html:not(.dark) .blog-article-content td {
                        border-color: #e2e8f0;
                        color: #334155;
                      }
                      html:not(.dark) .blog-article-content tbody tr td:first-child {
                        color: #0f172a !important;
                        font-weight: 700 !important;
                        background: rgba(0, 166, 255, 0.04);
                      }
                      html:not(.dark) .blog-article-content tbody tr td:first-child * {
                        color: #0f172a !important;
                        font-weight: 700 !important;
                      }
                      html:not(.dark) .blog-article-content tbody tr:nth-child(even) td {
                        background-color: #f8fafc;
                      }
                      html:not(.dark) .blog-article-content tbody tr:nth-child(odd) td {
                        background-color: #ffffff;
                      }
                      html:not(.dark) .blog-article-content tbody tr:hover td {
                        background-color: #f0f9ff !important;
                      }
                      /* Sleek custom scrollbar for TOC */
                      .toc-scrollbar::-webkit-scrollbar {
                        width: 4px;
                      }
                      .toc-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      .toc-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(0, 166, 255, 0.25);
                        border-radius: 9999px;
                      }
                      .toc-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(0, 166, 255, 0.6);
                      }
                      .toc-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: rgba(0, 166, 255, 0.25) transparent;
                      }
                    `}</style>
                    <div dangerouslySetInnerHTML={{ __html: processedArticle.html }} />
                  </div>

                  {/* ── AUTHOR PROFILE & SOCIAL CARD (Directly Below Blog Content) ── */}
                  <div className="not-prose my-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/10 shadow-xs">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                      {/* Author Avatar */}
                      <div className="relative shrink-0">
                        {blog.author_photo ? (
                          <img
                            src={mediaUrl(blog.author_photo)}
                            alt={formatAuthorName(blog.author_name || blog.author)}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex'
                            }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#00A6FF]/40 shadow-md"
                          />
                        ) : null}
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#00A6FF] via-[#0077CC] to-[#FF6D00] text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-md ${blog.author_photo ? 'hidden' : 'flex'}`}
                        >
                          {(formatAuthorName(blog.author_name || blog.author) || 'T').charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Author Details */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00A6FF] bg-[#00A6FF]/10 px-2.5 py-0.5 rounded-full border border-[#00A6FF]/20">
                            About the Author
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                            {formatAuthorName(blog.author_name || blog.author)}
                          </h4>
                          {blog.author_designation && (
                            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                              {blog.author_designation}
                            </p>
                          )}
                        </div>

                        {/* Author Bio */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                          {blog.author_bio || 'Specialist contributor at Taraj Global sharing actionable B2B revenue architectures, qualification frameworks, and outbound growth playbooks.'}
                        </p>

                        {/* Author Social Links */}
                        {((blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url) ||
                          (blog.author_twitter || blog.author_twitter_url || blog.twitter_url)) && (
                            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
                              {(blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url) && (
                                <a
                                  href={
                                    (blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url).startsWith('http')
                                      ? (blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url)
                                      : `https://${blog.author_linkedin || blog.author_linkedin_url || blog.linkedin_url}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0077B5]/10 text-[#0077B5] dark:text-[#38BDF8] border border-[#0077B5]/30 hover:bg-[#0077B5] hover:text-white transition-all shadow-2xs group"
                                  title="Connect on LinkedIn"
                                >
                                  <Linkedin size={13} className="shrink-0 group-hover:scale-110 transition-transform" />
                                  <span>LinkedIn</span>
                                </a>
                              )}

                              {(blog.author_twitter || blog.author_twitter_url || blog.twitter_url) && (
                                <a
                                  href={
                                    (blog.author_twitter || blog.author_twitter_url || blog.twitter_url).startsWith('http')
                                      ? (blog.author_twitter || blog.author_twitter_url || blog.twitter_url)
                                      : `https://${blog.author_twitter || blog.author_twitter_url || blog.twitter_url}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-2xs group"
                                  title="Follow on Twitter / X"
                                >
                                  <Twitter size={13} className="shrink-0 group-hover:scale-110 transition-transform" />
                                  <span>Twitter / X</span>
                                </a>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* ── FREQUENTLY ASKED QUESTIONS SECTION (UNIFIED WEBSITE UI) ── */}
                  <div className="not-prose my-10 sm:my-12 scroll-mt-28" id="faq">
                    <BlogFAQ
                      categoryKey={blog.category_name}
                      faqs={processedArticle.faqs?.length > 0 ? processedArticle.faqs : null}
                      title={processedArticle.faqTitle?.replace(/questions?/i, '').trim() || 'Frequently Asked'}
                      highlightTitle="Questions"
                      isArticleInline={true}
                      description={processedArticle.faqDescription || undefined}
                    />
                  </div>

                  {/* Share This Article Section */}
                  <ShareArticle title={blog.title} />

                </article>
              </div>

              {/* RIGHT: STICKY EDITORIAL SIDEBAR (Only rendered on desktop) */}
              {tableOfContents.length > 0 && (
                <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
                  <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#11141e] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col max-h-[calc(100vh-8.5rem)]">
                    <div className="pb-3 mb-3 border-b border-slate-100 dark:border-white/5 shrink-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-text-tertiary">
                          <ListFilter size={14} className="text-[#00A6FF]" />
                          <span>TABLE OF CONTENTS</span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-[#00A6FF] px-2 py-0.5 rounded-full bg-[#00A6FF]/10">
                          {activeSection
                            ? `${Math.max(1, tableOfContents.findIndex((t) => t.id === activeSection) + 1)}/${tableOfContents.length}`
                            : `${tableOfContents.length} SECTIONS`}
                        </span>
                      </div>
                      {/* Simultaneous reading progress bar */}
                      <div className="mt-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#00A6FF] to-[#00E5FF] h-1 rounded-full transition-all duration-150"
                          style={{ width: `${Math.round(articleProgress * 100)}%` }}
                        />
                      </div>
                    </div>
                    <nav
                      ref={tocNavRef}
                      data-lenis-prevent="true"
                      onMouseEnter={() => {
                        isHoveringTocRef.current = true
                      }}
                      onMouseLeave={() => {
                        isHoveringTocRef.current = false
                      }}
                      className="space-y-1 overflow-y-auto pr-1.5 toc-scrollbar flex-1 -mr-1.5"
                    >
                      {tableOfContents.map((item, idx) => {
                        const isActive = activeSection === item.id
                        const isH3 = item.level === 'h3'
                        return (
                          <a
                            key={item.id || idx}
                            data-toc-id={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault()
                              handleTocClick(item.id)
                            }}
                            className={`group w-full text-left flex items-start gap-2.5 py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              isActive
                                ? 'bg-[#00A6FF]/10 text-[#00A6FF] dark:text-[#00A6FF] font-semibold border-l-2 border-[#00A6FF] shadow-xs'
                                : 'text-text-secondary dark:text-[#A7ADB7] hover:text-[#00A6FF] dark:hover:text-[#00A6FF] hover:bg-slate-100/50 dark:hover:bg-white/[0.03] border-l-2 border-transparent'
                            } ${isH3 ? 'pl-4 text-xs' : 'text-xs sm:text-sm'}`}
                          >
                            <span
                              className={`font-mono text-[10px] shrink-0 mt-0.5 transition-colors ${
                                isActive ? 'text-[#00A6FF] font-bold' : 'text-text-tertiary group-hover:text-[#00A6FF]'
                              }`}
                            >
                              {String(idx + 1).padStart(2, '0')}.
                            </span>
                            <span className="leading-snug line-clamp-2">{item.title}</span>
                          </a>
                        )
                      })}
                    </nav>
                  </div>
                </aside>
              )}

            </div>
          </Container>
        </section>

        {/* ── RELATED ARTICLES / NEXT READS ─────────────────────────── */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200/80 dark:border-white/5">
            <Container>
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#00A6FF]">
                      MORE FROM THE KNOWLEDGE HUB
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary dark:text-white mt-1">
                      Recommended Next Reads
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/blog')}
                    className="text-xs font-mono font-bold text-[#00A6FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedBlogs.map((item, idx) => (
                    <BlogCard
                      key={item.id || item.slug || idx}
                      blog={item}
                      index={idx}
                      onReadMore={(b) => window.open(`/blog/${b.slug}`, '_blank', 'noopener,noreferrer')}
                    />
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

      </div>
    </>
  )
}

export default BlogDetails
