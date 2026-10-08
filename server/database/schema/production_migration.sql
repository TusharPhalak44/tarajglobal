-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: tarajglobal
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tarajglobal`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tarajglobal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `tarajglobal`;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `action` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `record_id` int DEFAULT NULL,
  `record_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_action` (`action`),
  KEY `idx_module` (`module`),
  KEY `idx_record` (`record_type`,`record_id`),
  KEY `idx_created` (`created_at`),
  KEY `idx_audit_logs_user_created` (`user_id`,`created_at`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `linkedin_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `authors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,NULL,'Alena','alena','','Washington','',NULL,'alena@example.com',NULL,NULL,'active','2026-10-07 12:16:33','2026-10-07 12:16:33'),(3,5,'alex@example.com','alexexamplecom',NULL,NULL,NULL,NULL,'alex@example.com',NULL,NULL,'active','2026-10-07 19:57:12','2026-10-07 19:57:12');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_tags`
--

DROP TABLE IF EXISTS `blog_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_id` int NOT NULL,
  `tag_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_blog_tag` (`blog_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `blog_tags_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blog_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_tags`
--

LOCK TABLES `blog_tags` WRITE;
/*!40000 ALTER TABLE `blog_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `status` enum('draft','published','archived','scheduled') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `featured` tinyint(1) DEFAULT '0',
  `reading_time` int DEFAULT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text COLLATE utf8mb4_unicode_ci,
  `seo_keywords` text COLLATE utf8mb4_unicode_ci,
  `canonical_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_description` text COLLATE utf8mb4_unicode_ci,
  `seo_score` int DEFAULT '0',
  `seo_analysis` json DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `published_by` int DEFAULT NULL,
  `view_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'How B2B Companies Can Build a Predictable Lead Generation Engine in 2026','<p>A&nbsp;successful&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;strategy&nbsp;needs&nbsp;to&nbsp;connect&nbsp;the&nbsp;right&nbsp;audience,&nbsp;the&nbsp;right&nbsp;message,&nbsp;and&nbsp;the&nbsp;right&nbsp;sales&nbsp;approach&nbsp;at&nbsp;the&nbsp;right&nbsp;time.</p><p>Instead&nbsp;of&nbsp;relying&nbsp;on&nbsp;occasional&nbsp;campaigns&nbsp;or&nbsp;large&nbsp;volumes&nbsp;of&nbsp;unqualified&nbsp;leads,&nbsp;businesses&nbsp;are&nbsp;increasingly&nbsp;building&nbsp;<strong>predictable&nbsp;lead&nbsp;generation&nbsp;engines</strong>&nbsp;that&nbsp;continuously&nbsp;identify&nbsp;prospects,&nbsp;engage&nbsp;decision-makers,&nbsp;qualify&nbsp;opportunities,&nbsp;and&nbsp;move&nbsp;them&nbsp;toward&nbsp;sales&nbsp;conversations.</p><h2>What&nbsp;Is&nbsp;a&nbsp;Predictable&nbsp;B2B&nbsp;Lead&nbsp;Generation&nbsp;Engine?</h2><p>A&nbsp;predictable&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;structured&nbsp;system&nbsp;that&nbsp;continuously&nbsp;produces&nbsp;qualified&nbsp;opportunities&nbsp;through&nbsp;a&nbsp;combination&nbsp;of:</p><ul><li>Targeted&nbsp;prospecting</li><li>Account-Based&nbsp;Marketing&nbsp;(ABM)</li><li>Content&nbsp;syndication</li><li>Lead&nbsp;qualification</li><li>Appointment&nbsp;setting</li><li>Marketing&nbsp;automation</li><li>Sales&nbsp;and&nbsp;marketing&nbsp;alignment</li><li>Continuous&nbsp;performance&nbsp;optimization</li></ul><p>The&nbsp;goal&nbsp;isn&#39;t&nbsp;simply&nbsp;to&nbsp;generate&nbsp;more&nbsp;leads.</p><p>The&nbsp;goal&nbsp;is&nbsp;to&nbsp;generate&nbsp;<strong>more&nbsp;of&nbsp;the&nbsp;right&nbsp;leads</strong>.</p><h2>Why&nbsp;Traditional&nbsp;Lead&nbsp;Generation&nbsp;Is&nbsp;No&nbsp;Longer&nbsp;Enough</h2><p>Many&nbsp;B2B&nbsp;organizations&nbsp;still&nbsp;measure&nbsp;their&nbsp;marketing&nbsp;success&nbsp;by&nbsp;website&nbsp;visits,&nbsp;form&nbsp;submissions,&nbsp;or&nbsp;total&nbsp;leads&nbsp;generated.</p><p>However,&nbsp;a&nbsp;large&nbsp;number&nbsp;of&nbsp;leads&nbsp;does&nbsp;not&nbsp;necessarily&nbsp;translate&nbsp;into&nbsp;revenue.</p><p>For&nbsp;example,&nbsp;a&nbsp;campaign&nbsp;may&nbsp;generate&nbsp;1,000&nbsp;leads,&nbsp;but&nbsp;if&nbsp;only&nbsp;20&nbsp;match&nbsp;the&nbsp;company&#39;s&nbsp;ideal&nbsp;customer&nbsp;profile,&nbsp;the&nbsp;sales&nbsp;team&nbsp;spends&nbsp;valuable&nbsp;time&nbsp;filtering&nbsp;through&nbsp;prospects&nbsp;that&nbsp;were&nbsp;never&nbsp;likely&nbsp;to&nbsp;convert.</p><p>A&nbsp;predictable&nbsp;system&nbsp;focuses&nbsp;on&nbsp;<strong>lead&nbsp;quality,&nbsp;intent,&nbsp;qualification,&nbsp;and&nbsp;revenue&nbsp;potential</strong>&nbsp;rather&nbsp;than&nbsp;volume&nbsp;alone.</p><h2>1.&nbsp;Start&nbsp;With&nbsp;Your&nbsp;Ideal&nbsp;Customer&nbsp;Profile</h2><p>The&nbsp;foundation&nbsp;of&nbsp;an&nbsp;effective&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;clearly&nbsp;defined&nbsp;Ideal&nbsp;Customer&nbsp;Profile&nbsp;(ICP).</p><p>Your&nbsp;ICP&nbsp;should&nbsp;identify&nbsp;characteristics&nbsp;such&nbsp;as:</p><ul><li>Industry</li><li>Company&nbsp;size</li><li>Revenue</li><li>Geography</li><li>Technology&nbsp;stack</li><li>Business&nbsp;challenges</li><li>Buying&nbsp;triggers</li><li>Decision-maker&nbsp;roles</li></ul><p>The&nbsp;more&nbsp;accurately&nbsp;your&nbsp;ICP&nbsp;is&nbsp;defined,&nbsp;the&nbsp;easier&nbsp;it&nbsp;becomes&nbsp;to&nbsp;identify&nbsp;companies&nbsp;that&nbsp;are&nbsp;most&nbsp;likely&nbsp;to&nbsp;become&nbsp;valuable&nbsp;customers.</p><h2>2.&nbsp;Use&nbsp;ABM&nbsp;to&nbsp;Reach&nbsp;High-Value&nbsp;Accounts</h2><p>Account-Based&nbsp;Marketing&nbsp;allows&nbsp;B2B&nbsp;companies&nbsp;to&nbsp;focus&nbsp;their&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;resources&nbsp;on&nbsp;specific&nbsp;high-value&nbsp;accounts.</p><p>Instead&nbsp;of&nbsp;creating&nbsp;one&nbsp;generic&nbsp;campaign&nbsp;for&nbsp;an&nbsp;entire&nbsp;market,&nbsp;ABM&nbsp;allows&nbsp;teams&nbsp;to&nbsp;create&nbsp;targeted&nbsp;messaging&nbsp;for&nbsp;carefully&nbsp;selected&nbsp;companies&nbsp;and&nbsp;decision-makers.</p><p>A&nbsp;strong&nbsp;ABM&nbsp;strategy&nbsp;can&nbsp;include:</p><p><strong>Identify&nbsp;ΓåÆ&nbsp;Research&nbsp;ΓåÆ&nbsp;Engage&nbsp;ΓåÆ&nbsp;Qualify&nbsp;ΓåÆ&nbsp;Convert&nbsp;ΓåÆ&nbsp;Expand</strong></p><p>This&nbsp;creates&nbsp;a&nbsp;more&nbsp;focused&nbsp;approach&nbsp;to&nbsp;enterprise&nbsp;lead&nbsp;generation.</p><h2>3.&nbsp;Turn&nbsp;Content&nbsp;Into&nbsp;a&nbsp;Lead&nbsp;Generation&nbsp;Asset</h2><p>Content&nbsp;should&nbsp;do&nbsp;more&nbsp;than&nbsp;attract&nbsp;visitors.</p><p>It&nbsp;should&nbsp;help&nbsp;potential&nbsp;buyers&nbsp;understand&nbsp;their&nbsp;problems&nbsp;and&nbsp;move&nbsp;closer&nbsp;to&nbsp;a&nbsp;purchasing&nbsp;decision.</p><p>Effective&nbsp;B2B&nbsp;content&nbsp;can&nbsp;include:</p><ul><li>Industry&nbsp;reports</li><li>Whitepapers</li><li>Case&nbsp;studies</li><li>Research&nbsp;reports</li><li>Webinars</li><li>Expert&nbsp;guides</li><li>Comparison&nbsp;articles</li><li>Solution-focused&nbsp;blogs</li></ul><p>The&nbsp;key&nbsp;is&nbsp;to&nbsp;create&nbsp;content&nbsp;around&nbsp;the&nbsp;questions&nbsp;and&nbsp;challenges&nbsp;your&nbsp;target&nbsp;buyers&nbsp;are&nbsp;already&nbsp;searching&nbsp;for.</p><h2>4.&nbsp;Qualify&nbsp;Leads&nbsp;Before&nbsp;Sending&nbsp;Them&nbsp;to&nbsp;Sales</h2><p>Not&nbsp;every&nbsp;lead&nbsp;deserves&nbsp;the&nbsp;same&nbsp;level&nbsp;of&nbsp;sales&nbsp;attention.</p><p>Lead&nbsp;qualification&nbsp;frameworks&nbsp;such&nbsp;as&nbsp;<strong>MQL,&nbsp;HQL,&nbsp;and&nbsp;BANT</strong>&nbsp;can&nbsp;help&nbsp;businesses&nbsp;identify&nbsp;which&nbsp;prospects&nbsp;are&nbsp;ready&nbsp;for&nbsp;sales&nbsp;engagement.</p><p>For&nbsp;example:</p><p><strong>MQL:</strong>&nbsp;Shows&nbsp;marketing&nbsp;engagement.</p><p><strong>HQL:</strong>&nbsp;Demonstrates&nbsp;stronger&nbsp;interest&nbsp;or&nbsp;buying&nbsp;intent.</p><p><strong>BANT-qualified:</strong>&nbsp;Has&nbsp;Budget,&nbsp;Authority,&nbsp;Need,&nbsp;and&nbsp;a&nbsp;relevant&nbsp;Timeline.</p><p>This&nbsp;process&nbsp;helps&nbsp;sales&nbsp;teams&nbsp;prioritize&nbsp;opportunities&nbsp;instead&nbsp;of&nbsp;spending&nbsp;time&nbsp;on&nbsp;low-intent&nbsp;prospects.</p><h2>5.&nbsp;Build&nbsp;a&nbsp;Continuous&nbsp;Optimization&nbsp;Loop</h2><p>A&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;should&nbsp;never&nbsp;be&nbsp;treated&nbsp;as&nbsp;a&nbsp;&quot;set&nbsp;it&nbsp;and&nbsp;forget&nbsp;it&quot;&nbsp;campaign.</p><p>Performance&nbsp;should&nbsp;continuously&nbsp;be&nbsp;analyzed&nbsp;across:</p><p><strong>Targeting&nbsp;ΓåÆ&nbsp;Messaging&nbsp;ΓåÆ&nbsp;Engagement&nbsp;ΓåÆ&nbsp;Qualification&nbsp;ΓåÆ&nbsp;Meetings&nbsp;ΓåÆ&nbsp;Pipeline&nbsp;ΓåÆ&nbsp;Revenue</strong></p><p>If&nbsp;one&nbsp;stage&nbsp;underperforms,&nbsp;the&nbsp;strategy&nbsp;should&nbsp;be&nbsp;adjusted.</p><p>For&nbsp;example,&nbsp;if&nbsp;a&nbsp;campaign&nbsp;generates&nbsp;strong&nbsp;engagement&nbsp;but&nbsp;very&nbsp;few&nbsp;meetings,&nbsp;the&nbsp;problem&nbsp;may&nbsp;not&nbsp;be&nbsp;traffic.&nbsp;It&nbsp;could&nbsp;be&nbsp;targeting,&nbsp;qualification,&nbsp;messaging,&nbsp;or&nbsp;the&nbsp;transition&nbsp;from&nbsp;marketing&nbsp;to&nbsp;sales.</p><h2>The&nbsp;Future&nbsp;of&nbsp;B2B&nbsp;Lead&nbsp;Generation</h2><p>The&nbsp;strongest&nbsp;B2B&nbsp;organizations&nbsp;are&nbsp;moving&nbsp;away&nbsp;from&nbsp;disconnected&nbsp;campaigns&nbsp;and&nbsp;toward&nbsp;integrated&nbsp;revenue&nbsp;systems.</p><p>Instead&nbsp;of&nbsp;asking:</p><p><strong>&quot;How&nbsp;many&nbsp;leads&nbsp;did&nbsp;we&nbsp;generate?&quot;</strong></p><p>companies&nbsp;should&nbsp;ask:</p><p><strong>&quot;How&nbsp;many&nbsp;qualified&nbsp;opportunities&nbsp;did&nbsp;we&nbsp;create,&nbsp;and&nbsp;how&nbsp;much&nbsp;pipeline&nbsp;did&nbsp;they&nbsp;generate?&quot;</strong></p><p>That&nbsp;shiftΓÇöfrom&nbsp;lead&nbsp;volume&nbsp;to&nbsp;revenue&nbsp;impactΓÇöis&nbsp;what&nbsp;makes&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;more&nbsp;predictable.</p><h2>Conclusion</h2><p>Building&nbsp;a&nbsp;predictable&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;requires&nbsp;more&nbsp;than&nbsp;generating&nbsp;large&nbsp;numbers&nbsp;of&nbsp;contacts.</p><p>It&nbsp;requires&nbsp;the&nbsp;right&nbsp;combination&nbsp;of&nbsp;<strong>ICP&nbsp;targeting,&nbsp;ABM,&nbsp;content,&nbsp;qualification,&nbsp;appointment&nbsp;setting,&nbsp;data,&nbsp;and&nbsp;continuous&nbsp;optimization.</strong></p><p>When&nbsp;these&nbsp;components&nbsp;work&nbsp;together,&nbsp;lead&nbsp;generation&nbsp;becomes&nbsp;a&nbsp;repeatable&nbsp;process&nbsp;rather&nbsp;than&nbsp;a&nbsp;series&nbsp;of&nbsp;disconnected&nbsp;campaigns.</p><p>The&nbsp;result&nbsp;is&nbsp;a&nbsp;stronger&nbsp;pipeline,&nbsp;better&nbsp;sales&nbsp;efficiency,&nbsp;and&nbsp;a&nbsp;clearer&nbsp;path&nbsp;from&nbsp;marketing&nbsp;activity&nbsp;to&nbsp;revenue.</p><p><strong>Ready&nbsp;to&nbsp;build&nbsp;a&nbsp;more&nbsp;predictable&nbsp;B2B&nbsp;pipeline?</strong></p><p>Connect&nbsp;your&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;strategy&nbsp;with&nbsp;a&nbsp;data-driven&nbsp;lead&nbsp;generation&nbsp;approach&nbsp;designed&nbsp;around&nbsp;your&nbsp;ideal&nbsp;customers.</p>','For B2B companies, generating leads consistently is more challenging than simply increasing website traffic.',NULL,NULL,'2026-10-07 12:17:56','2026-10-07 12:17:56','how-b2b-companies-can-build-a-predictable-lead-generation-engine-in-2026',NULL,1,1,'published',0,1,NULL,NULL,'Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Keywords',NULL,NULL,NULL,NULL,45,'{\"score\": 45, \"checks\": [{\"name\": \"SEO Title\", \"score\": 13, \"status\": \"success\", \"message\": \"Good title\", \"maxScore\": 15, \"recommendations\": []}, {\"name\": \"SEO Slug\", \"score\": 6, \"status\": \"warning\", \"message\": \"Slug needs improvement\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Keep your slug between 2-6 words separated by hyphens\", \"why\": \"Slugs with 2-6 words are more SEO-friendly\", \"issue\": \"Slug length is not optimal\"}]}, {\"name\": \"Meta Description\", \"score\": 12, \"status\": \"success\", \"message\": \"Good meta description\", \"maxScore\": 15, \"recommendations\": []}, {\"name\": \"Content Length\", \"score\": 5, \"status\": \"error\", \"message\": \"Content is too short\", \"maxScore\": 20, \"recommendations\": [{\"how\": \"Aim for at least 300 words for better SEO performance\", \"why\": \"Longer content tends to rank better in search results\", \"issue\": \"Content is too short\"}, {\"how\": \"Break your content into multiple paragraphs\", \"why\": \"Well-structured content is easier to read and rank\", \"issue\": \"Content lacks proper paragraph structure\"}]}, {\"name\": \"Headings Structure\", \"score\": 4, \"status\": \"warning\", \"message\": \"Heading structure needs improvement\", \"maxScore\": 10, \"recommendations\": []}, {\"name\": \"Featured Media\", \"score\": 0, \"status\": \"warning\", \"message\": \"No featured media\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Add a relevant featured image to your blog post\", \"why\": \"Featured images improve engagement and social sharing\", \"issue\": \"Missing featured media\"}]}, {\"name\": \"Internal/External Links\", \"score\": 0, \"status\": \"error\", \"message\": \"No links found\", \"maxScore\": 10, \"recommendations\": []}, {\"name\": \"Readability\", \"score\": 5, \"status\": \"warning\", \"message\": \"Readability needs improvement\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Break long sentences into shorter ones for better readability\", \"why\": \"Sentences between 10-25 words are easier to read\", \"issue\": \"Average sentence length is not optimal\"}]}], \"status\": \"Needs Improvement\", \"maxScore\": 100, \"recommendations\": [{\"how\": \"Keep your slug between 2-6 words separated by hyphens\", \"why\": \"Slugs with 2-6 words are more SEO-friendly\", \"issue\": \"Slug length is not optimal\"}, {\"how\": \"Aim for at least 300 words for better SEO performance\", \"why\": \"Longer content tends to rank better in search results\", \"issue\": \"Content is too short\"}, {\"how\": \"Break your content into multiple paragraphs\", \"why\": \"Well-structured content is easier to read and rank\", \"issue\": \"Content lacks proper paragraph structure\"}, {\"how\": \"Add a relevant featured image to your blog post\", \"why\": \"Featured images improve engagement and social sharing\", \"issue\": \"Missing featured media\"}, {\"how\": \"Break long sentences into shorter ones for better readability\", \"why\": \"Sentences between 10-25 words are easier to read\", \"issue\": \"Average sentence length is not optimal\"}]}',NULL,NULL,NULL,0),(2,'How B2B Companies Can Build a Predictable Lead Generation Engine in 2026','<p>A&nbsp;successful&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;strategy&nbsp;needs&nbsp;to&nbsp;connect&nbsp;the&nbsp;right&nbsp;audience,&nbsp;the&nbsp;right&nbsp;message,&nbsp;and&nbsp;the&nbsp;right&nbsp;sales&nbsp;approach&nbsp;at&nbsp;the&nbsp;right&nbsp;time.</p><p></p><p>Instead&nbsp;of&nbsp;relying&nbsp;on&nbsp;occasional&nbsp;campaigns&nbsp;or&nbsp;large&nbsp;volumes&nbsp;of&nbsp;unqualified&nbsp;leads,&nbsp;businesses&nbsp;are&nbsp;increasingly&nbsp;building&nbsp;predictable&nbsp;lead&nbsp;generation&nbsp;engines&nbsp;that&nbsp;continuously&nbsp;identify&nbsp;prospects,&nbsp;engage&nbsp;decision-makers,&nbsp;qualify&nbsp;opportunities,&nbsp;and&nbsp;move&nbsp;them&nbsp;toward&nbsp;sales&nbsp;conversations.</p><p></p><p>What&nbsp;Is&nbsp;a&nbsp;Predictable&nbsp;B2B&nbsp;Lead&nbsp;Generation&nbsp;Engine?</p><p></p><p>A&nbsp;predictable&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;structured&nbsp;system&nbsp;that&nbsp;continuously&nbsp;produces&nbsp;qualified&nbsp;opportunities&nbsp;through&nbsp;a&nbsp;combination&nbsp;of:</p><p></p><p>Targeted&nbsp;prospecting</p><p></p><p>Account-Based&nbsp;Marketing&nbsp;(ABM)</p><p></p><p>Content&nbsp;syndication</p><p></p><p>Lead&nbsp;qualification</p><p></p><p>Appointment&nbsp;setting</p><p></p><p>Marketing&nbsp;automation</p><p></p><p>Sales&nbsp;and&nbsp;marketing&nbsp;alignment</p><p></p><p>Continuous&nbsp;performance&nbsp;optimization</p><p></p><p>The&nbsp;goal&nbsp;isn&#39;t&nbsp;simply&nbsp;to&nbsp;generate&nbsp;more&nbsp;leads.</p><p></p><p>The&nbsp;goal&nbsp;is&nbsp;to&nbsp;generate&nbsp;more&nbsp;of&nbsp;the&nbsp;right&nbsp;leads.</p><p></p><p>Why&nbsp;Traditional&nbsp;Lead&nbsp;Generation&nbsp;Is&nbsp;No&nbsp;Longer&nbsp;Enough</p><p></p><p>Many&nbsp;B2B&nbsp;organizations&nbsp;still&nbsp;measure&nbsp;their&nbsp;marketing&nbsp;success&nbsp;by&nbsp;website&nbsp;visits,&nbsp;form&nbsp;submissions,&nbsp;or&nbsp;total&nbsp;leads&nbsp;generated.</p><p></p><p>However,&nbsp;a&nbsp;large&nbsp;number&nbsp;of&nbsp;leads&nbsp;does&nbsp;not&nbsp;necessarily&nbsp;translate&nbsp;into&nbsp;revenue.</p><p></p><p>For&nbsp;example,&nbsp;a&nbsp;campaign&nbsp;may&nbsp;generate&nbsp;1,000&nbsp;leads,&nbsp;but&nbsp;if&nbsp;only&nbsp;20&nbsp;match&nbsp;the&nbsp;company&#39;s&nbsp;ideal&nbsp;customer&nbsp;profile,&nbsp;the&nbsp;sales&nbsp;team&nbsp;spends&nbsp;valuable&nbsp;time&nbsp;filtering&nbsp;through&nbsp;prospects&nbsp;that&nbsp;were&nbsp;never&nbsp;likely&nbsp;to&nbsp;convert.</p><p></p><p>A&nbsp;predictable&nbsp;system&nbsp;focuses&nbsp;on&nbsp;lead&nbsp;quality,&nbsp;intent,&nbsp;qualification,&nbsp;and&nbsp;revenue&nbsp;potential&nbsp;rather&nbsp;than&nbsp;volume&nbsp;alone.</p><p></p><p>1.&nbsp;Start&nbsp;With&nbsp;Your&nbsp;Ideal&nbsp;Customer&nbsp;Profile</p><p></p><p>The&nbsp;foundation&nbsp;of&nbsp;an&nbsp;effective&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;clearly&nbsp;defined&nbsp;Ideal&nbsp;Customer&nbsp;Profile&nbsp;(ICP).</p><p></p><p>Your&nbsp;ICP&nbsp;should&nbsp;identify&nbsp;characteristics&nbsp;such&nbsp;as:</p><p></p><p>Industry</p><p></p><p>Company&nbsp;size</p><p></p><p>Revenue</p><p></p><p>Geography</p><p></p><p>Technology&nbsp;stack</p><p></p><p>Business&nbsp;challenges</p><p></p><p>Buying&nbsp;triggers</p><p></p><p>Decision-maker&nbsp;roles</p><p></p><p>The&nbsp;more&nbsp;accurately&nbsp;your&nbsp;ICP&nbsp;is&nbsp;defined,&nbsp;the&nbsp;easier&nbsp;it&nbsp;becomes&nbsp;to&nbsp;identify&nbsp;companies&nbsp;that&nbsp;are&nbsp;most&nbsp;likely&nbsp;to&nbsp;become&nbsp;valuable&nbsp;customers.</p><p></p><p>2.&nbsp;Use&nbsp;ABM&nbsp;to&nbsp;Reach&nbsp;High-Value&nbsp;Accounts</p><p></p><p>Account-Based&nbsp;Marketing&nbsp;allows&nbsp;B2B&nbsp;companies&nbsp;to&nbsp;focus&nbsp;their&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;resources&nbsp;on&nbsp;specific&nbsp;high-value&nbsp;accounts.</p><p></p><p>Instead&nbsp;of&nbsp;creating&nbsp;one&nbsp;generic&nbsp;campaign&nbsp;for&nbsp;an&nbsp;entire&nbsp;market,&nbsp;ABM&nbsp;allows&nbsp;teams&nbsp;to&nbsp;create&nbsp;targeted&nbsp;messaging&nbsp;for&nbsp;carefully&nbsp;selected&nbsp;companies&nbsp;and&nbsp;decision-makers.</p><p></p><p>A&nbsp;strong&nbsp;ABM&nbsp;strategy&nbsp;can&nbsp;include:</p><p></p><p>Identify&nbsp;ΓåÆ&nbsp;Research&nbsp;ΓåÆ&nbsp;Engage&nbsp;ΓåÆ&nbsp;Qualify&nbsp;ΓåÆ&nbsp;Convert&nbsp;ΓåÆ&nbsp;Expand</p><p></p><p>This&nbsp;creates&nbsp;a&nbsp;more&nbsp;focused&nbsp;approach&nbsp;to&nbsp;enterprise&nbsp;lead&nbsp;generation.</p><p></p><p>3.&nbsp;Turn&nbsp;Content&nbsp;Into&nbsp;a&nbsp;Lead&nbsp;Generation&nbsp;Asset</p><p></p><p>Content&nbsp;should&nbsp;do&nbsp;more&nbsp;than&nbsp;attract&nbsp;visitors.</p><p></p><p>It&nbsp;should&nbsp;help&nbsp;potential&nbsp;buyers&nbsp;understand&nbsp;their&nbsp;problems&nbsp;and&nbsp;move&nbsp;closer&nbsp;to&nbsp;a&nbsp;purchasing&nbsp;decision.</p><p></p><p>Effective&nbsp;B2B&nbsp;content&nbsp;can&nbsp;include:</p><p></p><p>Industry&nbsp;reports</p><p></p><p>Whitepapers</p><p></p><p>Case&nbsp;studies</p><p></p><p>Research&nbsp;reports</p><p></p><p>Webinars</p><p></p><p>Expert&nbsp;guides</p><p></p><p>Comparison&nbsp;articles</p><p></p><p>Solution-focused&nbsp;blogs</p><p></p><p>The&nbsp;key&nbsp;is&nbsp;to&nbsp;create&nbsp;content&nbsp;around&nbsp;the&nbsp;questions&nbsp;and&nbsp;challenges&nbsp;your&nbsp;target&nbsp;buyers&nbsp;are&nbsp;already&nbsp;searching&nbsp;for.</p><p></p><p>4.&nbsp;Qualify&nbsp;Leads&nbsp;Before&nbsp;Sending&nbsp;Them&nbsp;to&nbsp;Sales</p><p></p><p>Not&nbsp;every&nbsp;lead&nbsp;deserves&nbsp;the&nbsp;same&nbsp;level&nbsp;of&nbsp;sales&nbsp;attention.</p><p></p><p>Lead&nbsp;qualification&nbsp;frameworks&nbsp;such&nbsp;as&nbsp;MQL,&nbsp;HQL,&nbsp;and&nbsp;BANT&nbsp;can&nbsp;help&nbsp;businesses&nbsp;identify&nbsp;which&nbsp;prospects&nbsp;are&nbsp;ready&nbsp;for&nbsp;sales&nbsp;engagement.</p><p></p><p>For&nbsp;example:</p><p></p><p>MQL:&nbsp;Shows&nbsp;marketing&nbsp;engagement.</p><p></p><p>HQL:&nbsp;Demonstrates&nbsp;stronger&nbsp;interest&nbsp;or&nbsp;buying&nbsp;intent.</p><p></p><p>BANT-qualified:&nbsp;Has&nbsp;Budget,&nbsp;Authority,&nbsp;Need,&nbsp;and&nbsp;a&nbsp;relevant&nbsp;Timeline.</p><p></p><p>This&nbsp;process&nbsp;helps&nbsp;sales&nbsp;teams&nbsp;prioritize&nbsp;opportunities&nbsp;instead&nbsp;of&nbsp;spending&nbsp;time&nbsp;on&nbsp;low-intent&nbsp;prospects.</p><p></p><p>5.&nbsp;Build&nbsp;a&nbsp;Continuous&nbsp;Optimization&nbsp;Loop</p><p></p><p>A&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;should&nbsp;never&nbsp;be&nbsp;treated&nbsp;as&nbsp;a&nbsp;&quot;set&nbsp;it&nbsp;and&nbsp;forget&nbsp;it&quot;&nbsp;campaign.</p><p></p><p>Performance&nbsp;should&nbsp;continuously&nbsp;be&nbsp;analyzed&nbsp;across:</p><p></p><p>Targeting&nbsp;ΓåÆ&nbsp;Messaging&nbsp;ΓåÆ&nbsp;Engagement&nbsp;ΓåÆ&nbsp;Qualification&nbsp;ΓåÆ&nbsp;Meetings&nbsp;ΓåÆ&nbsp;Pipeline&nbsp;ΓåÆ&nbsp;Revenue</p><p></p><p>If&nbsp;one&nbsp;stage&nbsp;underperforms,&nbsp;the&nbsp;strategy&nbsp;should&nbsp;be&nbsp;adjusted.</p><p></p><p>For&nbsp;example,&nbsp;if&nbsp;a&nbsp;campaign&nbsp;generates&nbsp;strong&nbsp;engagement&nbsp;but&nbsp;very&nbsp;few&nbsp;meetings,&nbsp;the&nbsp;problem&nbsp;may&nbsp;not&nbsp;be&nbsp;traffic.&nbsp;It&nbsp;could&nbsp;be&nbsp;targeting,&nbsp;qualification,&nbsp;messaging,&nbsp;or&nbsp;the&nbsp;transition&nbsp;from&nbsp;marketing&nbsp;to&nbsp;sales.</p><p></p><p>The&nbsp;Future&nbsp;of&nbsp;B2B&nbsp;Lead&nbsp;Generation</p><p></p><p>The&nbsp;strongest&nbsp;B2B&nbsp;organizations&nbsp;are&nbsp;moving&nbsp;away&nbsp;from&nbsp;disconnected&nbsp;campaigns&nbsp;and&nbsp;toward&nbsp;integrated&nbsp;revenue&nbsp;systems.</p><p></p><p>Instead&nbsp;of&nbsp;asking:</p><p></p><p>&quot;How&nbsp;many&nbsp;leads&nbsp;did&nbsp;we&nbsp;generate?&quot;</p><p></p><p>companies&nbsp;should&nbsp;ask:</p><p></p><p>&quot;How&nbsp;many&nbsp;qualified&nbsp;opportunities&nbsp;did&nbsp;we&nbsp;create,&nbsp;and&nbsp;how&nbsp;much&nbsp;pipeline&nbsp;did&nbsp;they&nbsp;generate?&quot;</p><p></p><p>That&nbsp;shiftΓÇöfrom&nbsp;lead&nbsp;volume&nbsp;to&nbsp;revenue&nbsp;impactΓÇöis&nbsp;what&nbsp;makes&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;more&nbsp;predictable.</p><p></p><p>Conclusion</p><p></p><p>Building&nbsp;a&nbsp;predictable&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;requires&nbsp;more&nbsp;than&nbsp;generating&nbsp;large&nbsp;numbers&nbsp;of&nbsp;contacts.</p><p></p><p>It&nbsp;requires&nbsp;the&nbsp;right&nbsp;combination&nbsp;of&nbsp;ICP&nbsp;targeting,&nbsp;ABM,&nbsp;content,&nbsp;qualification,&nbsp;appointment&nbsp;setting,&nbsp;data,&nbsp;and&nbsp;continuous&nbsp;optimization.</p><p></p><p>When&nbsp;these&nbsp;components&nbsp;work&nbsp;together,&nbsp;lead&nbsp;generation&nbsp;becomes&nbsp;a&nbsp;repeatable&nbsp;process&nbsp;rather&nbsp;than&nbsp;a&nbsp;series&nbsp;of&nbsp;disconnected&nbsp;campaigns.</p><p></p><p>The&nbsp;result&nbsp;is&nbsp;a&nbsp;stronger&nbsp;pipeline,&nbsp;better&nbsp;sales&nbsp;efficiency,&nbsp;and&nbsp;a&nbsp;clearer&nbsp;path&nbsp;from&nbsp;marketing&nbsp;activity&nbsp;to&nbsp;revenue.</p><p></p><p>Ready&nbsp;to&nbsp;build&nbsp;a&nbsp;more&nbsp;predictable&nbsp;B2B&nbsp;pipeline?</p><p></p><p>Connect&nbsp;your&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;strategy&nbsp;with&nbsp;a&nbsp;data-driven&nbsp;lead&nbsp;generation&nbsp;approach&nbsp;designed&nbsp;around&nbsp;your&nbsp;ideal&nbsp;customers.</p>','A successful B2B lead generation strategy needs to connect the right audience, the right message, and the right sales approach at the right time.','/uploads/media/1791375954672-538c091f93faa51d.png',NULL,'2026-10-07 12:26:22','2026-10-07 12:26:22','how-b2b-companies-can-build-a-predictable-lead-generation-engine-in-2026-1','/uploads/media/1791375954672-538c091f93faa51d.png',1,1,'published',0,1,NULL,NULL,'Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Keywords',NULL,NULL,NULL,NULL,54,'{\"score\": 54, \"checks\": [{\"name\": \"SEO Title\", \"score\": 13, \"status\": \"success\", \"message\": \"Good title\", \"maxScore\": 15, \"recommendations\": []}, {\"name\": \"SEO Slug\", \"score\": 6, \"status\": \"warning\", \"message\": \"Slug needs improvement\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Keep your slug between 2-6 words separated by hyphens\", \"why\": \"Slugs with 2-6 words are more SEO-friendly\", \"issue\": \"Slug length is not optimal\"}]}, {\"name\": \"Meta Description\", \"score\": 15, \"status\": \"success\", \"message\": \"Good meta description\", \"maxScore\": 15, \"recommendations\": []}, {\"name\": \"Content Length\", \"score\": 5, \"status\": \"error\", \"message\": \"Content is too short\", \"maxScore\": 20, \"recommendations\": [{\"how\": \"Aim for at least 300 words for better SEO performance\", \"why\": \"Longer content tends to rank better in search results\", \"issue\": \"Content is too short\"}, {\"how\": \"Break your content into multiple paragraphs\", \"why\": \"Well-structured content is easier to read and rank\", \"issue\": \"Content lacks proper paragraph structure\"}]}, {\"name\": \"Headings Structure\", \"score\": 0, \"status\": \"error\", \"message\": \"Poor heading structure\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Add H2 headings to organize your content sections\", \"why\": \"H2 headings help structure content for readers and search engines\", \"issue\": \"Content lacks H2 headings\"}]}, {\"name\": \"Featured Media\", \"score\": 10, \"status\": \"success\", \"message\": \"Good featured media\", \"maxScore\": 10, \"recommendations\": []}, {\"name\": \"Internal/External Links\", \"score\": 0, \"status\": \"error\", \"message\": \"No links found\", \"maxScore\": 10, \"recommendations\": []}, {\"name\": \"Readability\", \"score\": 5, \"status\": \"warning\", \"message\": \"Readability needs improvement\", \"maxScore\": 10, \"recommendations\": [{\"how\": \"Break long sentences into shorter ones for better readability\", \"why\": \"Sentences between 10-25 words are easier to read\", \"issue\": \"Average sentence length is not optimal\"}]}], \"status\": \"Needs Improvement\", \"maxScore\": 100, \"recommendations\": [{\"how\": \"Keep your slug between 2-6 words separated by hyphens\", \"why\": \"Slugs with 2-6 words are more SEO-friendly\", \"issue\": \"Slug length is not optimal\"}, {\"how\": \"Aim for at least 300 words for better SEO performance\", \"why\": \"Longer content tends to rank better in search results\", \"issue\": \"Content is too short\"}, {\"how\": \"Break your content into multiple paragraphs\", \"why\": \"Well-structured content is easier to read and rank\", \"issue\": \"Content lacks proper paragraph structure\"}, {\"how\": \"Add H2 headings to organize your content sections\", \"why\": \"H2 headings help structure content for readers and search engines\", \"issue\": \"Content lacks H2 headings\"}, {\"how\": \"Break long sentences into shorter ones for better readability\", \"why\": \"Sentences between 10-25 words are easier to read\", \"issue\": \"Average sentence length is not optimal\"}]}',NULL,NULL,NULL,0),(3,'Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','<h2>What&nbsp;Is&nbsp;a&nbsp;Predictable&nbsp;B2B&nbsp;Lead&nbsp;Generation&nbsp;Engine?</h2><p>A&nbsp;predictable&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;structured&nbsp;system&nbsp;that&nbsp;continuously&nbsp;produces&nbsp;qualified&nbsp;opportunities&nbsp;through&nbsp;a&nbsp;combination&nbsp;of:</p><ul><li>Targeted&nbsp;prospecting</li><li>Account-Based&nbsp;Marketing&nbsp;(ABM)</li><li>Content&nbsp;syndication</li><li>Lead&nbsp;qualification</li><li>Appointment&nbsp;setting</li><li>Marketing&nbsp;automation</li><li>Sales&nbsp;and&nbsp;marketing&nbsp;alignment</li><li>Continuous&nbsp;performance&nbsp;optimization</li></ul><p>The&nbsp;goal&nbsp;isn&#39;t&nbsp;simply&nbsp;to&nbsp;generate&nbsp;more&nbsp;leads.</p><p>The&nbsp;goal&nbsp;is&nbsp;to&nbsp;generate&nbsp;<strong>more&nbsp;of&nbsp;the&nbsp;right&nbsp;leads</strong>.</p><h2>Why&nbsp;Traditional&nbsp;Lead&nbsp;Generation&nbsp;Is&nbsp;No&nbsp;Longer&nbsp;Enough</h2><p>Many&nbsp;B2B&nbsp;organizations&nbsp;still&nbsp;measure&nbsp;their&nbsp;marketing&nbsp;success&nbsp;by&nbsp;website&nbsp;visits,&nbsp;form&nbsp;submissions,&nbsp;or&nbsp;total&nbsp;leads&nbsp;generated.</p><p>However,&nbsp;a&nbsp;large&nbsp;number&nbsp;of&nbsp;leads&nbsp;does&nbsp;not&nbsp;necessarily&nbsp;translate&nbsp;into&nbsp;revenue.</p><p>For&nbsp;example,&nbsp;a&nbsp;campaign&nbsp;may&nbsp;generate&nbsp;1,000&nbsp;leads,&nbsp;but&nbsp;if&nbsp;only&nbsp;20&nbsp;match&nbsp;the&nbsp;company&#39;s&nbsp;ideal&nbsp;customer&nbsp;profile,&nbsp;the&nbsp;sales&nbsp;team&nbsp;spends&nbsp;valuable&nbsp;time&nbsp;filtering&nbsp;through&nbsp;prospects&nbsp;that&nbsp;were&nbsp;never&nbsp;likely&nbsp;to&nbsp;convert.</p><p>A&nbsp;predictable&nbsp;system&nbsp;focuses&nbsp;on&nbsp;<strong>lead&nbsp;quality,&nbsp;intent,&nbsp;qualification,&nbsp;and&nbsp;revenue&nbsp;potential</strong>&nbsp;rather&nbsp;than&nbsp;volume&nbsp;alone.</p><h2>1.&nbsp;Start&nbsp;With&nbsp;Your&nbsp;Ideal&nbsp;Customer&nbsp;Profile</h2><p>The&nbsp;foundation&nbsp;of&nbsp;an&nbsp;effective&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;is&nbsp;a&nbsp;clearly&nbsp;defined&nbsp;Ideal&nbsp;Customer&nbsp;Profile&nbsp;(ICP).</p><p>Your&nbsp;ICP&nbsp;should&nbsp;identify&nbsp;characteristics&nbsp;such&nbsp;as:</p><ul><li>Industry</li><li>Company&nbsp;size</li><li>Revenue</li><li>Geography</li><li>Technology&nbsp;stack</li><li>Business&nbsp;challenges</li><li>Buying&nbsp;triggers</li><li>Decision-maker&nbsp;roles</li></ul><p>The&nbsp;more&nbsp;accurately&nbsp;your&nbsp;ICP&nbsp;is&nbsp;defined,&nbsp;the&nbsp;easier&nbsp;it&nbsp;becomes&nbsp;to&nbsp;identify&nbsp;companies&nbsp;that&nbsp;are&nbsp;most&nbsp;likely&nbsp;to&nbsp;become&nbsp;valuable&nbsp;customers.</p><h2>2.&nbsp;Use&nbsp;ABM&nbsp;to&nbsp;Reach&nbsp;High-Value&nbsp;Accounts</h2><p>Account-Based&nbsp;Marketing&nbsp;allows&nbsp;B2B&nbsp;companies&nbsp;to&nbsp;focus&nbsp;their&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;resources&nbsp;on&nbsp;specific&nbsp;high-value&nbsp;accounts.</p><p>Instead&nbsp;of&nbsp;creating&nbsp;one&nbsp;generic&nbsp;campaign&nbsp;for&nbsp;an&nbsp;entire&nbsp;market,&nbsp;ABM&nbsp;allows&nbsp;teams&nbsp;to&nbsp;create&nbsp;targeted&nbsp;messaging&nbsp;for&nbsp;carefully&nbsp;selected&nbsp;companies&nbsp;and&nbsp;decision-makers.</p><p>A&nbsp;strong&nbsp;ABM&nbsp;strategy&nbsp;can&nbsp;include:</p><p><strong>Identify&nbsp;ΓåÆ&nbsp;Research&nbsp;ΓåÆ&nbsp;Engage&nbsp;ΓåÆ&nbsp;Qualify&nbsp;ΓåÆ&nbsp;Convert&nbsp;ΓåÆ&nbsp;Expand</strong></p><p>This&nbsp;creates&nbsp;a&nbsp;more&nbsp;focused&nbsp;approach&nbsp;to&nbsp;enterprise&nbsp;lead&nbsp;generation.</p><h2>3.&nbsp;Turn&nbsp;Content&nbsp;Into&nbsp;a&nbsp;Lead&nbsp;Generation&nbsp;Asset</h2><p>Content&nbsp;should&nbsp;do&nbsp;more&nbsp;than&nbsp;attract&nbsp;visitors.</p><p>It&nbsp;should&nbsp;help&nbsp;potential&nbsp;buyers&nbsp;understand&nbsp;their&nbsp;problems&nbsp;and&nbsp;move&nbsp;closer&nbsp;to&nbsp;a&nbsp;purchasing&nbsp;decision.</p><p>Effective&nbsp;B2B&nbsp;content&nbsp;can&nbsp;include:</p><ul><li>Industry&nbsp;reports</li><li>Whitepapers</li><li>Case&nbsp;studies</li><li>Research&nbsp;reports</li><li>Webinars</li><li>Expert&nbsp;guides</li><li>Comparison&nbsp;articles</li><li>Solution-focused&nbsp;blogs</li></ul><p>The&nbsp;key&nbsp;is&nbsp;to&nbsp;create&nbsp;content&nbsp;around&nbsp;the&nbsp;questions&nbsp;and&nbsp;challenges&nbsp;your&nbsp;target&nbsp;buyers&nbsp;are&nbsp;already&nbsp;searching&nbsp;for.</p><h2>4.&nbsp;Qualify&nbsp;Leads&nbsp;Before&nbsp;Sending&nbsp;Them&nbsp;to&nbsp;Sales</h2><p>Not&nbsp;every&nbsp;lead&nbsp;deserves&nbsp;the&nbsp;same&nbsp;level&nbsp;of&nbsp;sales&nbsp;attention.</p><p>Lead&nbsp;qualification&nbsp;frameworks&nbsp;such&nbsp;as&nbsp;<strong>MQL,&nbsp;HQL,&nbsp;and&nbsp;BANT</strong>&nbsp;can&nbsp;help&nbsp;businesses&nbsp;identify&nbsp;which&nbsp;prospects&nbsp;are&nbsp;ready&nbsp;for&nbsp;sales&nbsp;engagement.</p><p>For&nbsp;example:</p><p><strong>MQL:</strong>&nbsp;Shows&nbsp;marketing&nbsp;engagement.</p><p><strong>HQL:</strong>&nbsp;Demonstrates&nbsp;stronger&nbsp;interest&nbsp;or&nbsp;buying&nbsp;intent.</p><p><strong>BANT-qualified:</strong>&nbsp;Has&nbsp;Budget,&nbsp;Authority,&nbsp;Need,&nbsp;and&nbsp;a&nbsp;relevant&nbsp;Timeline.</p><p>This&nbsp;process&nbsp;helps&nbsp;sales&nbsp;teams&nbsp;prioritize&nbsp;opportunities&nbsp;instead&nbsp;of&nbsp;spending&nbsp;time&nbsp;on&nbsp;low-intent&nbsp;prospects.</p><h2>5.&nbsp;Build&nbsp;a&nbsp;Continuous&nbsp;Optimization&nbsp;Loop</h2><p>A&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;should&nbsp;never&nbsp;be&nbsp;treated&nbsp;as&nbsp;a&nbsp;&quot;set&nbsp;it&nbsp;and&nbsp;forget&nbsp;it&quot;&nbsp;campaign.</p><p>Performance&nbsp;should&nbsp;continuously&nbsp;be&nbsp;analyzed&nbsp;across:</p><p><strong>Targeting&nbsp;ΓåÆ&nbsp;Messaging&nbsp;ΓåÆ&nbsp;Engagement&nbsp;ΓåÆ&nbsp;Qualification&nbsp;ΓåÆ&nbsp;Meetings&nbsp;ΓåÆ&nbsp;Pipeline&nbsp;ΓåÆ&nbsp;Revenue</strong></p><p>If&nbsp;one&nbsp;stage&nbsp;underperforms,&nbsp;the&nbsp;strategy&nbsp;should&nbsp;be&nbsp;adjusted.</p><p>For&nbsp;example,&nbsp;if&nbsp;a&nbsp;campaign&nbsp;generates&nbsp;strong&nbsp;engagement&nbsp;but&nbsp;very&nbsp;few&nbsp;meetings,&nbsp;the&nbsp;problem&nbsp;may&nbsp;not&nbsp;be&nbsp;traffic.&nbsp;It&nbsp;could&nbsp;be&nbsp;targeting,&nbsp;qualification,&nbsp;messaging,&nbsp;or&nbsp;the&nbsp;transition&nbsp;from&nbsp;marketing&nbsp;to&nbsp;sales.</p><h2>The&nbsp;Future&nbsp;of&nbsp;B2B&nbsp;Lead&nbsp;Generation</h2><p>The&nbsp;strongest&nbsp;B2B&nbsp;organizations&nbsp;are&nbsp;moving&nbsp;away&nbsp;from&nbsp;disconnected&nbsp;campaigns&nbsp;and&nbsp;toward&nbsp;integrated&nbsp;revenue&nbsp;systems.</p><p>Instead&nbsp;of&nbsp;asking:</p><p><strong>&quot;How&nbsp;many&nbsp;leads&nbsp;did&nbsp;we&nbsp;generate?&quot;</strong></p><p>companies&nbsp;should&nbsp;ask:</p><p><strong>&quot;How&nbsp;many&nbsp;qualified&nbsp;opportunities&nbsp;did&nbsp;we&nbsp;create,&nbsp;and&nbsp;how&nbsp;much&nbsp;pipeline&nbsp;did&nbsp;they&nbsp;generate?&quot;</strong></p><p>That&nbsp;shiftΓÇöfrom&nbsp;lead&nbsp;volume&nbsp;to&nbsp;revenue&nbsp;impactΓÇöis&nbsp;what&nbsp;makes&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;more&nbsp;predictable.</p><h2>Conclusion</h2><p>Building&nbsp;a&nbsp;predictable&nbsp;B2B&nbsp;lead&nbsp;generation&nbsp;engine&nbsp;requires&nbsp;more&nbsp;than&nbsp;generating&nbsp;large&nbsp;numbers&nbsp;of&nbsp;contacts.</p><p>It&nbsp;requires&nbsp;the&nbsp;right&nbsp;combination&nbsp;of&nbsp;<strong>ICP&nbsp;targeting,&nbsp;ABM,&nbsp;content,&nbsp;qualification,&nbsp;appointment&nbsp;setting,&nbsp;data,&nbsp;and&nbsp;continuous&nbsp;optimization.</strong></p><p>When&nbsp;these&nbsp;components&nbsp;work&nbsp;together,&nbsp;lead&nbsp;generation&nbsp;becomes&nbsp;a&nbsp;repeatable&nbsp;process&nbsp;rather&nbsp;than&nbsp;a&nbsp;series&nbsp;of&nbsp;disconnected&nbsp;campaigns.</p><p>The&nbsp;result&nbsp;is&nbsp;a&nbsp;stronger&nbsp;pipeline,&nbsp;better&nbsp;sales&nbsp;efficiency,&nbsp;and&nbsp;a&nbsp;clearer&nbsp;path&nbsp;from&nbsp;marketing&nbsp;activity&nbsp;to&nbsp;revenue.</p><p><strong>Ready&nbsp;to&nbsp;build&nbsp;a&nbsp;more&nbsp;predictable&nbsp;B2B&nbsp;pipeline?</strong></p><p>Connect&nbsp;your&nbsp;marketing&nbsp;and&nbsp;sales&nbsp;strategy&nbsp;with&nbsp;a&nbsp;data-driven&nbsp;lead&nbsp;generation&nbsp;approach&nbsp;designed&nbsp;around&nbsp;your&nbsp;ideal&nbsp;customers.</p>','A successful B2B lead generation strategy needs to connect the right audience, the right message, and the right sales approach at the right time.\n\nInstead of re','/uploads/media/1791377077738-43da5a2bfeee98b3.png',NULL,'2026-10-07 12:44:42','2026-10-08 15:22:13','learn-how-b2b-companies-can-build-a-predictable-lead-generation-engine-using-abm-content-syndication-appointment-setting-and-data-driven-optimization','/uploads/media/1791377077738-43da5a2bfeee98b3.png',1,1,'published',0,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,53,'{\"score\": 53, \"checks\": [{\"name\": \"SEO Title\", \"score\": 10, \"status\": \"warning\"}, {\"name\": \"URL Slug\", \"score\": 7, \"status\": \"warning\"}, {\"name\": \"Meta Description\", \"score\": 15, \"status\": \"success\"}, {\"name\": \"Content Length\", \"score\": 0, \"status\": \"error\"}, {\"name\": \"Headings Structure\", \"score\": 6, \"status\": \"warning\"}, {\"name\": \"Media & Images\", \"score\": 6, \"status\": \"success\"}, {\"name\": \"Internal/External Links\", \"score\": 2, \"status\": \"warning\"}, {\"name\": \"Readability\", \"score\": 7, \"status\": \"success\"}], \"status\": \"Needs Improvement\", \"maxScore\": 100, \"recommendations\": []}',NULL,1,NULL,0),(4,'Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','<p>How&nbsp;B2B&nbsp;Companies&nbsp;Can&nbsp;Build&nbsp;a&nbsp;Predictable&nbsp;Lead&nbsp;Generation&nbsp;Engine&nbsp;in&nbsp;2026</p>','A successful B2B lead generation strategy needs to connect the right audience, the right message, and the right sales approach at the right time.\n\nInstead of re','/uploads/media/1791378031197-6ba44b2189f75169.png',NULL,'2026-10-07 13:00:59','2026-10-07 13:07:56','learn-how-b2b-companies-can-build-a-predictable-lead-generation-engine-using-abm-content-syndication-appointment-setting-and-data-driven-optimization-1','/uploads/media/1791378031197-6ba44b2189f75169.png',1,1,'archived',0,1,NULL,NULL,'Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Learn how B2B companies can build a predictable lead generation engine using ABM, content syndication, appointment setting, and data-driven optimization.','Keywords',NULL,NULL,NULL,NULL,47,'{\"score\": 47, \"checks\": [{\"name\": \"SEO Title\", \"score\": 10, \"status\": \"warning\"}, {\"name\": \"URL Slug\", \"score\": 7, \"status\": \"warning\"}, {\"name\": \"Meta Description\", \"score\": 15, \"status\": \"success\"}, {\"name\": \"Content Length\", \"score\": 0, \"status\": \"error\"}, {\"name\": \"Headings Structure\", \"score\": 0, \"status\": \"error\"}, {\"name\": \"Media & Images\", \"score\": 6, \"status\": \"success\"}, {\"name\": \"Internal/External Links\", \"score\": 2, \"status\": \"warning\"}, {\"name\": \"Readability\", \"score\": 7, \"status\": \"success\"}], \"status\": \"Needs Improvement\", \"maxScore\": 100, \"recommendations\": []}',NULL,NULL,NULL,0),(6,'Add a Strong Lead Qualification Process','<p>A&nbsp;structured&nbsp;qualification&nbsp;process&nbsp;can&nbsp;help&nbsp;your&nbsp;sales&nbsp;team&nbsp;prioritize&nbsp;opportunities&nbsp;based&nbsp;on:</p><ul><li><strong>Business&nbsp;fit</strong></li><li><strong>Decision-maker&nbsp;involvement</strong></li><li><strong>Current&nbsp;business&nbsp;need</strong></li><li><strong>Buying&nbsp;intent</strong></li><li><strong>Budget&nbsp;availability</strong></li><li><strong>Expected&nbsp;purchase&nbsp;timeline</strong></li></ul><p>This&nbsp;prevents&nbsp;sales&nbsp;teams&nbsp;from&nbsp;wasting&nbsp;time&nbsp;on&nbsp;contacts&nbsp;that&nbsp;are&nbsp;unlikely&nbsp;to&nbsp;convert.</p>','Generating leads is only the first step. The next challenge is determining which prospects have genuine buying potential.','/uploads/media/1791402932126-b7a1bba47cdeb051.png','alex@example.com','2026-10-07 19:57:12','2026-10-07 19:57:21','add-a-strong-lead-qualification-process','/uploads/media/1791402932126-b7a1bba47cdeb051.png',3,1,'published',0,1,NULL,NULL,'lead qualification','A structured qualification process can help your sales team prioritize opportunities based on:','process',NULL,NULL,NULL,NULL,55,'{\"score\": 55, \"checks\": [{\"name\": \"SEO Title\", \"score\": 15, \"status\": \"success\"}, {\"name\": \"URL Slug\", \"score\": 10, \"status\": \"success\"}, {\"name\": \"Meta Description\", \"score\": 15, \"status\": \"success\"}, {\"name\": \"Content Length\", \"score\": 0, \"status\": \"error\"}, {\"name\": \"Headings Structure\", \"score\": 0, \"status\": \"error\"}, {\"name\": \"Media & Images\", \"score\": 6, \"status\": \"success\"}, {\"name\": \"Internal/External Links\", \"score\": 2, \"status\": \"warning\"}, {\"name\": \"Readability\", \"score\": 7, \"status\": \"success\"}], \"status\": \"Needs Improvement\", \"maxScore\": 100, \"recommendations\": []}',5,5,NULL,0);
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `career_event_photos`
--

DROP TABLE IF EXISTS `career_event_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `career_event_photos` (
  `id` varchar(50) NOT NULL,
  `event_id` varchar(50) NOT NULL,
  `src` varchar(500) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `caption` text,
  `tag` varchar(100) DEFAULT NULL,
  `date` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `career_event_photos_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `career_events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career_event_photos`
--

LOCK TABLES `career_event_photos` WRITE;
/*!40000 ALTER TABLE `career_event_photos` DISABLE KEYS */;
INSERT INTO `career_event_photos` VALUES ('photo-1791384458868-968','monthly-performers-8137','/uploads/images/1791384458710-281b6d78afaedae0.png','','','tgs','Q2','2026-10-07 14:47:38');
/*!40000 ALTER TABLE `career_event_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `career_events`
--

DROP TABLE IF EXISTS `career_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `career_events` (
  `id` varchar(50) NOT NULL,
  `num` varchar(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `quarter` varchar(100) DEFAULT NULL,
  `description` text,
  `color` varchar(20) DEFAULT '#00A6FF',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `career_events`
--

LOCK TABLES `career_events` WRITE;
/*!40000 ALTER TABLE `career_events` DISABLE KEYS */;
INSERT INTO `career_events` VALUES ('monthly-performers-8137','01','Monthly performers','tgs','RNR','Q2','','#eeff00','2026-10-07 14:47:38');
/*!40000 ALTER TABLE `career_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `careers`
--

DROP TABLE IF EXISTS `careers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `careers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `requirements` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('full-time','part-time','contract','internship') COLLATE utf8mb4_unicode_ci DEFAULT 'full-time',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('draft','published','archived') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `experience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `careers`
--

LOCK TABLES `careers` WRITE;
/*!40000 ALTER TABLE `careers` DISABLE KEYS */;
INSERT INTO `careers` VALUES (1,'Software Developer','Develop, maintain, and optimize scalable web applications while working closely with frontend, backend, and product teams to deliver reliable digital solutions.','1-3 years of experience in software development\nStrong knowledge of JavaScript, HTML5, and CSS3\nExperience with React.js and Node.js\nUnderstanding of REST APIs and API integration\nWorking knowledge of Git and GitHub\nUnderstanding of databases such as MySQL or MongoDB\nAbility to debug, troubleshoot, and optimize applications\nStrong problem-solving and analytical skills\nGood understanding of responsive web development\nStrong written and verbal communication skills\nAbility to work effectively in a collaborative team environment','Kharadi, Pune (On-Site)','full-time','2026-10-07 20:32:14','2026-10-07 20:32:14','published','software-developer','Engineering & Technology','1 - 3 Years','');
/*!40000 ALTER TABLE `careers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `post_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'B2B Lead Generation','b2b-lead-generation',NULL,NULL,NULL,NULL,'active',0,'2026-10-07 12:15:59','2026-10-07 12:15:59');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_messages`
--

DROP TABLE IF EXISTS `chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender_type` enum('user','bot','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_session_created` (`session_id`,`created_at`),
  CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `chat_sessions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_messages`
--

LOCK TABLES `chat_messages` WRITE;
/*!40000 ALTER TABLE `chat_messages` DISABLE KEYS */;
INSERT INTO `chat_messages` VALUES (1,'cs_1791469487641_6d2af','bot','Taraj Assistant','Hi John! ≡ƒæï Welcome to **Taraj Global**. How can I help you today?','2026-10-08 14:24:49'),(2,'cs_1791469487641_6d2af','user','John Doe','What services do you offer?','2026-10-08 14:24:49'),(3,'cs_1791469487641_6d2af','bot','Taraj Assistant','We offer a comprehensive suite of B2B marketing & lead generation solutions:\n\n**Lead Generation Services:**\nΓÇó Content Syndication\nΓÇó BANT Lead Generation\nΓÇó MQL Services\nΓÇó B2B Appointment Setting\nΓÇó B2B Email Marketing\nΓÇó ABM (Account-Based Marketing)\nΓÇó Webinar Services\nΓÇó Lead Nurturing\nΓÇó Demand Generation\n\n**Database Services:**\nΓÇó B2B List Building\nΓÇó Database Cleansing\n\nWould you like details on any specific service?','2026-10-08 14:24:49'),(4,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Hi Manasi! ≡ƒæï Welcome to **Taraj Global**. How can I help you today?','2026-10-08 14:31:09'),(5,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','heyy','2026-10-08 14:31:18'),(6,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Hello! ≡ƒæï Welcome to **Taraj Global**! How can I help you today? Feel free to ask about our services, industries we serve, or company background.','2026-10-08 14:31:18'),(7,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','i want to ask you about th services of this company?','2026-10-08 14:34:48'),(8,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Hello! ≡ƒæï Welcome to **Taraj Global**! How can I help you today? Feel free to ask about our services, industries we serve, or company background.','2026-10-08 14:34:49'),(9,'cs_1791469869935_7xe8t','admin','Taraj Assistant','ok can you tell me about your company first ? so as per that basis i can explain you with our company\'s services','2026-10-08 14:35:54'),(10,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','yes my company name is taraj global','2026-10-08 14:37:33'),(11,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','can you tell me about your company?','2026-10-08 14:39:48'),(12,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','What services do you offer?','2026-10-08 15:07:13'),(13,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Thank you for providing your requirements! ≡ƒÄ» Based on our conversation history, Taraj Global can deliver a structured B2B lead generation solution tailored for your company.\n\nOur strategy team is reviewing your details. You can also reach our team directly at **info@tarajglobal.com** or call **+91 96655-99442** to schedule a formal discovery call.','2026-10-08 15:07:13'),(14,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','Tell me about Taraj Global','2026-10-08 15:07:22'),(15,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Thank you for providing your requirements! ≡ƒÄ» Based on our conversation history, Taraj Global can deliver a structured B2B lead generation solution tailored for your company.\n\nOur strategy team is reviewing your details. You can also reach our team directly at **info@tarajglobal.com** or call **+91 96655-99442** to schedule a formal discovery call.','2026-10-08 15:07:22'),(16,'cs_1791469869935_7xe8t','admin','Taraj Assistant','tell me how can i help you ?','2026-10-08 15:08:40'),(17,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','i want to know about your company and the services','2026-10-08 15:10:05'),(18,'cs_1791469869935_7xe8t','admin','Taraj Assistant','ok firstly tell me about your company first','2026-10-08 15:10:46'),(19,'cs_1791469869935_7xe8t','user','Manasi Kulkarni','my company name is MANTRA DEVELOPER SYSTEM','2026-10-08 15:11:32'),(20,'cs_1791469869935_7xe8t','bot','Taraj Assistant','Thank you for providing your requirements! ≡ƒÄ» Based on our conversation history, Taraj Global can deliver a structured B2B lead generation solution tailored for your company.\n\nOur strategy team is reviewing your details. You can also reach our team directly at **info@tarajglobal.com** or call **+91 96655-99442** to schedule a formal discovery call.','2026-10-08 15:16:34');
/*!40000 ALTER TABLE `chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_sessions`
--

DROP TABLE IF EXISTS `chat_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_sessions` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','closed') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `last_admin_reply_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_sessions`
--

LOCK TABLES `chat_sessions` WRITE;
/*!40000 ALTER TABLE `chat_sessions` DISABLE KEYS */;
INSERT INTO `chat_sessions` VALUES ('cs_1791469487641_6d2af','token_1791469487642_c94eficm','John','Doe','tgs.admin001@gmail.com','+1-555-0199','active',NULL,'2026-10-08 14:24:48','2026-10-08 14:24:49'),('cs_1791469869935_7xe8t','token_1791469869935_8u8zghus','Manasi','Kulkarni','kulkarnimanasi109@gmail.com','1234567890','active','2026-10-08 15:10:46','2026-10-08 14:31:09','2026-10-08 15:16:34');
/*!40000 ALTER TABLE `chat_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Mitel','/mitel.png',NULL,1,1,'2026-10-06 19:57:25','2026-10-06 19:57:25'),(2,'Vonage','/Vonage.png',NULL,2,1,'2026-10-06 19:57:25','2026-10-06 19:57:25'),(3,'RingCentral','/ringcentral.png',NULL,3,1,'2026-10-06 19:57:25','2026-10-06 19:57:25'),(4,'AVAYA','/Avaya.webp',NULL,4,1,'2026-10-06 19:57:25','2026-10-06 19:57:25'),(5,'Microsoft','/micro.png',NULL,5,1,'2026-10-06 19:57:25','2026-10-06 19:57:25'),(6,'Oracle','/ora.png',NULL,6,1,'2026-10-06 19:57:25','2026-10-06 19:57:25');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` enum('new','pending','contacted','qualified','converted','closed','read','replied') COLLATE utf8mb4_unicode_ci DEFAULT 'new',
  `assigned_to` int DEFAULT NULL,
  `source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'contact_form',
  `page_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','demand [IN]','manasi kulkarni is testing','new',NULL,'contact_form','http://localhost/contact','2026-10-06 19:04:08','2026-10-06 19:04:08'),(2,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','B2B Email Marketing [IN]','Manasi Kulkarni','new',NULL,'contact_form','http://localhost/contact','2026-10-06 19:08:48','2026-10-06 19:08:48'),(3,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','B2B Email Marketing [IN]','rthrvfgasdvsearf','new',NULL,'contact_form','http://localhost/contact','2026-10-06 19:49:18','2026-10-06 19:49:18'),(4,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','B2B Email Marketing [DE]','wssssEFCWEFWCDS','new',NULL,'contact_form','http://localhost/contact','2026-10-06 20:01:21','2026-10-06 20:01:21'),(5,'Test Name','test@example.com','','','','This is a test message','new',NULL,'contact_form','/','2026-10-06 20:09:29','2026-10-06 20:09:29'),(6,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','B2B Email Marketing [IN]','QDWQDadxwFCQFDEWFXWQDC','new',NULL,'contact_form','http://localhost/contact','2026-10-06 20:20:01','2026-10-06 20:20:01'),(7,'SAEE Kulkarni','nakshtrasulakhe@gmail.com','1234567890','','B2B Email Marketing [IN]','qwertyuiopas','new',NULL,'contact_form','http://localhost/contact','2026-10-06 20:23:51','2026-10-06 20:23:51'),(8,'tgs admin','saeekulkarni953@gmail.com','1234567890','','Pipeline Growth [FR]','abcdefghijklmnopqrstuvwxyz','new',NULL,'contact_form','http://localhost/contact','2026-10-08 12:59:05','2026-10-08 12:59:05'),(9,'Manasi Kulkarni','kulkarnimanasi109@gmail.com','1234567890','','Pipeline Growth [IN]','qwertyuiop1234567890','new',NULL,'contact_form','http://localhost/contact','2026-10-08 13:33:23','2026-10-08 13:33:23');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_contact_items`
--

DROP TABLE IF EXISTS `footer_contact_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_contact_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('address','phone','email','whatsapp','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'custom',
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Mail',
  `is_visible` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_visible` (`is_visible`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_contact_items`
--

LOCK TABLES `footer_contact_items` WRITE;
/*!40000 ALTER TABLE `footer_contact_items` DISABLE KEYS */;
INSERT INTO `footer_contact_items` VALUES (1,'email','Email','info@tarajglobal.com','mailto:info@tarajglobal.com','Mail',1,1,'2026-10-07 13:19:33','2026-10-07 13:19:33');
/*!40000 ALTER TABLE `footer_contact_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_links`
--

DROP TABLE IF EXISTS `footer_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section_id` int NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_type` enum('internal','external','custom_action') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'internal',
  `target` enum('_self','_blank') COLLATE utf8mb4_unicode_ci DEFAULT '_self',
  `custom_action` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_section_id` (`section_id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_visible` (`is_visible`),
  CONSTRAINT `footer_links_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `footer_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_links`
--

LOCK TABLES `footer_links` WRITE;
/*!40000 ALTER TABLE `footer_links` DISABLE KEYS */;
INSERT INTO `footer_links` VALUES (1,1,'Home','/','internal','_self',NULL,1,1,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(2,1,'About Us','/about','internal','_self',NULL,1,2,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(3,1,'Services','/services','internal','_self',NULL,1,3,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(4,1,'Careers','/careers','internal','_self',NULL,1,4,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(5,1,'Blogs','/blog','internal','_self',NULL,1,5,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(6,1,'Contact Us','/contact','internal','_self',NULL,1,6,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(7,2,'Privacy Policy','/privacy','internal','_self',NULL,1,1,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(8,2,'Terms & Conditions','/terms','internal','_self',NULL,1,2,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(9,2,'Cookies Policy','/cookies','internal','_self',NULL,1,3,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(10,2,'Cookie Settings','','custom_action','_self',NULL,1,4,'2026-10-07 13:19:32','2026-10-07 13:19:32');
/*!40000 ALTER TABLE `footer_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_offices`
--

DROP TABLE IF EXISTS `footer_offices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_offices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'MapPin',
  `is_visible` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_visible` (`is_visible`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_offices`
--

LOCK TABLES `footer_offices` WRITE;
/*!40000 ALTER TABLE `footer_offices` DISABLE KEYS */;
INSERT INTO `footer_offices` VALUES (1,'India Office','The Space Business Complex','Office No. 512 to 517, Grant Rd, Kharadi','Pune','Maharashtra','India','411014','https://www.google.com/maps/dir/?api=1&destination=The+Space+Business+Complex,+Office+No+512+to+517,+Grant+Rd,+Kharadi,+Pune,+Maharashtra+411014','+91 96655-99442',NULL,'MapPin',1,1,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(2,'USA Office','762, Fulton St','','San Francisco','California','USA','94115','https://www.google.com/maps/dir/?api=1&destination=762,+Fulton+St,+San+Francisco,+California+94115','+1 346-487-8307',NULL,'Building2',1,2,'2026-10-07 13:19:32','2026-10-07 13:19:32');
/*!40000 ALTER TABLE `footer_offices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_sections`
--

DROP TABLE IF EXISTS `footer_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_type` enum('links','contact','offices','custom') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'links',
  `is_visible` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_visible` (`is_visible`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_sections`
--

LOCK TABLES `footer_sections` WRITE;
/*!40000 ALTER TABLE `footer_sections` DISABLE KEYS */;
INSERT INTO `footer_sections` VALUES (1,'Useful Links','links',1,1,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(2,'Company','links',1,2,'2026-10-07 13:19:32','2026-10-07 13:19:32'),(3,'Contact Us','contact',1,3,'2026-10-07 13:19:32','2026-10-07 13:19:32');
/*!40000 ALTER TABLE `footer_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_settings`
--

DROP TABLE IF EXISTS `footer_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TaRaj Global',
  `company_description` text COLLATE utf8mb4_unicode_ci,
  `short_description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_logo_visible` tinyint(1) DEFAULT '1',
  `is_description_visible` tinyint(1) DEFAULT '1',
  `copyright_text` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT 'Copyright ┬⌐ {year} Taraj Global. All Rights Reserved.',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cert_image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_cert_image_visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_settings`
--

LOCK TABLES `footer_settings` WRITE;
/*!40000 ALTER TABLE `footer_settings` DISABLE KEYS */;
INSERT INTO `footer_settings` VALUES (1,'TaRaj Global','TaRaj Global is an ISO 9001:2015 (Quality) and ISO 27001:2022 (Data Security) certified B2B demand generation and technology marketing agency delivering performance-driven solutions.','ISO certified B2B demand generation and technology marketing agency.','/logo img.png',1,1,'Copyright ┬⌐ {year} Taraj Global. All Rights Reserved.','2026-10-07 13:19:31','2026-10-07 13:19:31',NULL,1);
/*!40000 ALTER TABLE `footer_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_social_links`
--

DROP TABLE IF EXISTS `footer_social_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_social_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_visible` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_visible` (`is_visible`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_social_links`
--

LOCK TABLES `footer_social_links` WRITE;
/*!40000 ALTER TABLE `footer_social_links` DISABLE KEYS */;
INSERT INTO `footer_social_links` VALUES (1,'LinkedIn','bi-linkedin','https://www.linkedin.com/company/taraj-global/',1,1,'2026-10-07 13:19:33','2026-10-07 13:19:33'),(2,'Twitter','bi-twitter-x','https://twitter.com/tarajglobal',0,2,'2026-10-07 13:19:33','2026-10-07 13:19:33'),(3,'Facebook','bi-facebook','https://facebook.com/tarajglobal',0,3,'2026-10-07 13:19:33','2026-10-07 13:19:33'),(4,'Instagram','bi-instagram','https://instagram.com/tarajglobal',0,4,'2026-10-07 13:19:33','2026-10-07 13:19:33');
/*!40000 ALTER TABLE `footer_social_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resume_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('applied','screening','shortlisted','interview','selected','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'applied',
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_email` (`email`),
  KEY `idx_applied_at` (`applied_at`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_applications`
--

LOCK TABLES `job_applications` WRITE;
/*!40000 ALTER TABLE `job_applications` DISABLE KEYS */;
INSERT INTO `job_applications` VALUES (1,'Manasi','Kulkarni','kulkarnimanasi109@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791405201783-228042514.pdf','applied','2026-10-07 20:33:21','2026-10-07 20:33:21'),(2,'Manasi','Kulkarni','kulkarnimanasi109@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791405799129-233035888.pdf','applied','2026-10-07 20:43:19','2026-10-07 20:43:19'),(3,'Manasi','Kulkarni','kulkarnimanasi109@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791405908032-330809323.pdf','applied','2026-10-07 20:45:08','2026-10-07 20:45:08'),(4,'John','Doe','saeekulkarni953@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791406839761-348981586.pdf','applied','2026-10-07 21:00:39','2026-10-07 21:00:39'),(5,'John','Doe','saeekulkarni953@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791406876722-610183507.pdf','applied','2026-10-07 21:01:16','2026-10-07 21:01:16'),(6,'Manasi','Kulkarni','kulkarnimanasi109@gmail.com','1234567890','Software Developer','uploads/resumes/resume-1791466880710-898442679.pdf','applied','2026-10-08 13:41:20','2026-10-08 13:41:20'),(7,'Saee','Kulkarni','saeekulkarni953@gmail.com','1234567890','General Application','uploads/resumes/resume-1791467096862-826464850.pdf','applied','2026-10-08 13:44:56','2026-10-08 13:44:56');
/*!40000 ALTER TABLE `job_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` int NOT NULL,
  `file_path` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caption` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `uploaded_by` int DEFAULT NULL,
  `status` enum('active','deleted') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_uploaded_by` (`uploaded_by`),
  KEY `idx_mime_type` (`mime_type`),
  KEY `idx_status` (`status`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'1791319549359-5deaf78e70016bd1.png','ChatGPT Image Sep 24, 2026, 08_46_52 PM.png','image/png',606265,'uploads/media/1791319549359-5deaf78e70016bd1.png','/uploads/media/1791319549359-5deaf78e70016bd1.png',NULL,NULL,NULL,NULL,NULL,1,'active','2026-10-06 20:45:49','2026-10-06 20:45:49'),(2,'1791375954672-538c091f93faa51d.png','ChatGPT Image Sep 24, 2026, 08_46_52 PM.png','image/png',606265,'uploads/media/1791375954672-538c091f93faa51d.png','/uploads/media/1791375954672-538c091f93faa51d.png',NULL,NULL,NULL,NULL,NULL,1,'active','2026-10-07 12:25:54','2026-10-07 12:25:54'),(3,'1791377077738-43da5a2bfeee98b3.png','ChatGPT Image Sep 24, 2026, 08_46_52 PM.png','image/png',606265,'uploads/media/1791377077738-43da5a2bfeee98b3.png','/uploads/media/1791377077738-43da5a2bfeee98b3.png',NULL,NULL,NULL,NULL,NULL,1,'active','2026-10-07 12:44:37','2026-10-07 12:44:37'),(4,'1791378031197-6ba44b2189f75169.png','ChatGPT Image Sep 24, 2026, 08_46_52 PM.png','image/png',606265,'uploads/media/1791378031197-6ba44b2189f75169.png','/uploads/media/1791378031197-6ba44b2189f75169.png',NULL,NULL,NULL,NULL,NULL,1,'active','2026-10-07 13:00:31','2026-10-07 13:00:31'),(5,'1791401540653-af6c20420bf07c31.png','test.png','image/png',18,'uploads/media/1791401540653-af6c20420bf07c31.png','/uploads/media/1791401540653-af6c20420bf07c31.png',NULL,NULL,NULL,NULL,NULL,5,'active','2026-10-07 19:32:20','2026-10-07 19:32:20'),(6,'1791401630726-e1194d033513ffd4.png','proxy_test.png','image/png',24,'uploads/media/1791401630726-e1194d033513ffd4.png','/uploads/media/1791401630726-e1194d033513ffd4.png',NULL,NULL,NULL,NULL,NULL,5,'active','2026-10-07 19:33:50','2026-10-07 19:33:50'),(7,'1791402932126-b7a1bba47cdeb051.png','Building a Predictable Lead Generation Engine.png','image/png',1810461,'uploads/media/1791402932126-b7a1bba47cdeb051.png','/uploads/media/1791402932126-b7a1bba47cdeb051.png',NULL,NULL,NULL,NULL,NULL,5,'active','2026-10-07 19:55:32','2026-10-07 19:55:32');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_date` date NOT NULL,
  `meeting_time` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_zone` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meeting_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Strategy Call',
  `status` enum('pending','confirmed','cancelled','completed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_id` (`booking_id`),
  KEY `idx_booking_id` (`booking_id`),
  KEY `idx_email` (`email`),
  KEY `idx_meeting_date` (`meeting_date`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,'c1748040-f4ea-4ca4-a758-db486e28d717','Test Meeting','saeekulkarni953@gmail.com','Test Company','','2026-12-31','14:00','Asia/Kolkata','Strategy Call','pending','2026-10-06 20:15:21','2026-10-06 20:15:21'),(2,'e9d77c19-2c81-448d-8a87-e95cbedbf1bf','Manasi','kulkarnimanasi109@gmail.com','TGS','1234567890','2026-10-08','10:00 AM','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:32:11','2026-10-08 13:32:11'),(3,'97ea246b-1a1e-4319-95f8-d53ca3691696','Test Meeting','tgs.admin001@gmail.com','Test Company','','2026-12-31','14:00','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:36:28','2026-10-08 13:36:28'),(4,'59a8a7c1-19f8-4745-b5de-b7ee9f6fdd31','Test Meeting','tgs.admin001@gmail.com','Test Company','','2027-01-15','14:00','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:43:28','2026-10-08 13:43:28'),(5,'42655e57-97e4-45ff-8c8b-6f1fc03a525f','Manasi Kulkarni','kulkarnimanasi109@gmail.com','TGS','1234567890','2026-10-07','12:00 PM','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:47:15','2026-10-08 13:47:15'),(6,'d8c26114-2554-45c2-977e-40164b58f052','Test Meeting','tgs.admin001@gmail.com','Test Company','','2027-02-10','14:00','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:55:00','2026-10-08 13:55:00'),(7,'4dad0c6c-20b8-418d-8a07-28a99370d9c9','Saee Kulkarni','saeekulkarni953@gmail.com','TGS','1234567890','2026-10-08','11:30 AM','Asia/Kolkata','Strategy Call','pending','2026-10-08 13:56:22','2026-10-08 13:56:22');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navbar_items`
--

DROP TABLE IF EXISTS `navbar_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navbar_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` enum('header','navbar') COLLATE utf8mb4_unicode_ci DEFAULT 'navbar',
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `parent_id` (`parent_id`),
  KEY `idx_section` (`section`),
  KEY `idx_display_order` (`display_order`),
  KEY `idx_is_active` (`is_active`),
  CONSTRAINT `navbar_items_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `navbar_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navbar_items`
--

LOCK TABLES `navbar_items` WRITE;
/*!40000 ALTER TABLE `navbar_items` DISABLE KEYS */;
INSERT INTO `navbar_items` VALUES (1,'navbar','Home','/',NULL,1,1,'2026-10-06 19:57:24','2026-10-07 13:37:13'),(2,'navbar','About Us','/about',NULL,2,1,'2026-10-06 19:57:24','2026-10-06 19:57:24'),(3,'navbar','Services','/services',NULL,3,1,'2026-10-06 19:57:24','2026-10-06 19:57:24'),(4,'navbar','Career','/careers',NULL,4,1,'2026-10-06 19:57:24','2026-10-06 19:57:24'),(5,'navbar','Blogs','/blog',NULL,5,1,'2026-10-06 19:57:24','2026-10-06 19:57:24'),(6,'navbar','Contact Us','/contact',NULL,6,1,'2026-10-06 19:57:24','2026-10-06 19:57:24'),(7,'header','info@tarajglobal.com','mailto:info@tarajglobal.com',NULL,1,1,'2026-10-07 13:50:19','2026-10-07 13:50:19'),(8,'header','+1-234-567-8900','tel:+1-234-567-8900',NULL,2,1,'2026-10-07 13:50:19','2026-10-07 13:50:19'),(9,'header','???? B2B Pipeline Acceleration','/contact',NULL,3,1,'2026-10-07 13:50:19','2026-10-07 13:50:19');
/*!40000 ALTER TABLE `navbar_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('info','success','warning','error') COLLATE utf8mb4_unicode_ci DEFAULT 'info',
  `action_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_id` int DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_is_read` (`is_read`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'New Lead Received','New lead from Test Name','info','/admin/leads','lead',5,0,'2026-10-06 20:09:29'),(2,1,'New Lead Received','New lead from Manasi Kulkarni','info','/admin/leads','lead',6,0,'2026-10-06 20:20:01'),(3,1,'New Lead Received','New lead from SAEE Kulkarni','info','/admin/leads','lead',7,0,'2026-10-06 20:23:51'),(4,1,'New Job Application','New application received from John Doe for Software Developer','info','/admin/applications','job_application',5,0,'2026-10-07 21:01:16'),(5,3,'New Job Application','New application received from John Doe for Software Developer','info','/admin/applications','job_application',5,0,'2026-10-07 21:01:16'),(6,1,'New Lead Received','New lead from tgs admin','info','/admin/leads','lead',8,0,'2026-10-08 12:59:05'),(7,3,'New Lead Received','New lead from tgs admin','info','/admin/leads','lead',8,0,'2026-10-08 12:59:05'),(8,1,'New Lead Received','New lead from Manasi Kulkarni','info','/admin/leads','lead',9,0,'2026-10-08 13:33:23'),(9,3,'New Lead Received','New lead from Manasi Kulkarni','info','/admin/leads','lead',9,0,'2026-10-08 13:33:23'),(10,1,'New Job Application','New application received from Manasi Kulkarni for Software Developer','info','/admin/applications','job_application',6,0,'2026-10-08 13:41:20'),(11,3,'New Job Application','New application received from Manasi Kulkarni for Software Developer','info','/admin/applications','job_application',6,0,'2026-10-08 13:41:20'),(12,1,'New Job Application','New application received from Saee Kulkarni for General Application','info','/admin/applications','job_application',7,0,'2026-10-08 13:44:57'),(13,3,'New Job Application','New application received from Saee Kulkarni for General Application','info','/admin/applications','job_application',7,0,'2026-10-08 13:44:57');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_views`
--

DROP TABLE IF EXISTS `page_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referrer` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_views`
--

LOCK TABLES `page_views` WRITE;
/*!40000 ALTER TABLE `page_views` DISABLE KEYS */;
INSERT INTO `page_views` VALUES (1,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 13:57:46'),(2,'/admin/seo',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 13:59:09'),(3,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 13:59:21'),(4,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 13:59:35'),(5,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 14:24:43'),(6,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 14:24:45'),(7,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 14:28:01'),(8,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 14:29:52'),(9,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 14:32:20'),(10,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 14:32:26'),(11,'/admin/seo-analytics',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:34:12'),(12,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:34:30'),(13,'/about',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 14:34:52'),(14,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 14:35:14'),(15,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:37:03'),(16,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:41:57'),(17,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 14:45:09'),(18,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:46:18'),(19,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:52:16'),(20,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 14:58:05'),(21,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:03:50'),(22,'/blog',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_j23v6ngrqfo','172.18.0.1','2026-10-07 15:09:17'),(23,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_j23v6ngrqfo','172.18.0.1','2026-10-07 15:09:24'),(24,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:10:47'),(25,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:13:44'),(26,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 15:14:56'),(27,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_j23v6ngrqfo','172.18.0.1','2026-10-07 15:24:25'),(28,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_hu1fbbo9uaj','172.18.0.1','2026-10-07 15:24:56'),(29,'/admin/authors',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:04'),(30,'/admin/categories',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:10'),(31,'/admin/categories',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:10'),(32,'/admin/archives',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:11'),(33,'/admin/drafts',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:12'),(34,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:13'),(35,'/admin/footer',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:15'),(36,'/admin/cms/clients',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:25:15'),(37,'/admin/footer',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:03'),(38,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:04'),(39,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:05'),(40,'/admin/seo-analytics',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:06'),(41,'/admin/seo',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:07'),(42,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:10'),(43,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:12'),(44,'/admin/notifications',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:13'),(45,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:15'),(46,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:15'),(47,'/admin/seo-analytics',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:16'),(48,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:17'),(49,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:20'),(50,'/admin/applications',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:23'),(51,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:26'),(52,'/admin/leads',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:28'),(53,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:33'),(54,'/admin/seo-analytics',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:34'),(55,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:35'),(56,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:53'),(57,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:26:53'),(58,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:27:02'),(59,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:27:03'),(60,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:27:12'),(61,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:27:35'),(62,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:27:38'),(63,'/admin/notifications',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:28:00'),(64,'/admin/settings',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:28:00'),(65,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:28:13'),(66,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:41:07'),(67,'/admin/settings',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:41:10'),(68,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:41:16'),(69,'/admin/audit-logs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:52:13'),(70,'/admin/notifications',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 15:52:14'),(71,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 16:12:55'),(72,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 16:16:44'),(73,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 16:20:10'),(74,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 16:20:31'),(75,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 16:20:47'),(76,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 16:20:51'),(77,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_h9l4l9slcff','172.18.0.1','2026-10-07 18:01:16'),(78,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_bwdejpnon2c','172.18.0.1','2026-10-07 18:01:16'),(79,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:02:24'),(80,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:19:30'),(81,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:19:35'),(82,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:19:35'),(83,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:19:49'),(84,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:19:49'),(85,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:20:10'),(86,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:09'),(87,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:09'),(88,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:26'),(89,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:26'),(90,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:43'),(91,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:48'),(92,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:21:48'),(93,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:02'),(94,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:02'),(95,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:12'),(96,'/admin/blogs/create',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:22'),(97,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:30'),(98,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:30'),(99,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:38'),(100,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:38'),(101,'/admin/blogs/create',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:40'),(102,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:51'),(103,'/admin/leads',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:22:58'),(104,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:52:49'),(105,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:57:03'),(106,'/admin/users',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:57:17'),(107,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:02'),(108,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:02'),(109,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:19'),(110,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:19'),(111,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:19'),(112,'/admin/blogs/create',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_ciam9otcera','172.18.0.1','2026-10-07 18:58:26'),(113,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_4rm8hwdtuzd','172.18.0.1','2026-10-07 19:02:22'),(114,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_nwqbuiigmkf','172.18.0.1','2026-10-07 19:53:31'),(115,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:53:44'),(116,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:53:53'),(117,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:54:07'),(118,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:54:07'),(119,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:54:07'),(120,'/admin/blogs/create',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:54:29'),(121,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:57:13'),(122,'/admin/drafts',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:57:26'),(123,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:57:27'),(124,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:57:27'),(125,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 19:57:51'),(126,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:05:53'),(127,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:05:53'),(128,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:06:26'),(129,'/admin/profile',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:06:46'),(130,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:00'),(131,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:18'),(132,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:18'),(133,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:29'),(134,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:29'),(135,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:33'),(136,'/admin/career-gallery',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:48'),(137,'/admin/seo-analytics',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:52'),(138,'/admin/seo',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:07:57'),(139,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:08:01'),(140,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_nwqbuiigmkf','172.18.0.1','2026-10-07 20:11:00'),(141,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:20:31'),(142,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:21:54'),(143,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:22:53'),(144,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_i9r51cmsp5','172.18.0.1','2026-10-07 20:24:19'),(145,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:26:02'),(146,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:26:07'),(147,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:26:16'),(148,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:26:58'),(149,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:26:58'),(150,'/admin/jobs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_sfla09ux8ur','172.18.0.1','2026-10-07 20:28:03'),(151,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_nwqbuiigmkf','172.18.0.1','2026-10-07 20:31:28'),(152,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_zoz0yguh5u','172.18.0.1','2026-10-07 20:32:24'),(153,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_zoz0yguh5u','172.18.0.1','2026-10-07 20:32:48'),(154,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_unv54m6ovl','172.18.0.1','2026-10-07 20:42:59'),(155,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_unv54m6ovl','172.18.0.1','2026-10-07 20:43:03'),(156,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_unv54m6ovl','172.18.0.1','2026-10-07 20:44:54'),(157,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 13:31:23'),(158,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 13:40:10'),(159,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 13:46:42'),(160,'/about',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 13:58:36'),(161,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 13:58:46'),(162,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 14:30:23'),(163,'/admin/chat',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 14:31:38'),(164,'/loginadmin',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 14:31:38'),(165,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 14:32:18'),(166,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 14:32:18'),(167,'/admin/chat',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 14:33:59'),(168,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 15:07:04'),(169,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:18:11'),(170,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:18:14'),(171,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:20:57'),(172,'/admin/dashboard',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 15:21:52'),(173,'/admin/blogs',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_inmc7gi0p6','172.18.0.1','2026-10-08 15:22:01'),(174,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:22:49'),(175,'/b2b-appointment-setting',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:34'),(176,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:36'),(177,'/blog',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:37'),(178,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:38'),(179,'/about',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:40'),(180,'/',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:23:42'),(181,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:24:07'),(182,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:28:35'),(183,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:28:48'),(184,'/b2b-email-marketing',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:28:52'),(185,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:07'),(186,'/b2b-email-marketing',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:11'),(187,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:27'),(188,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:40'),(189,'/blog',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:41'),(190,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:48'),(191,'/blog',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:50'),(192,'/careers',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:51'),(193,'/services',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:53'),(194,'/about',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:29:54'),(195,'/cookies',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:30:06'),(196,'/about',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:30:13'),(197,'/contact',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:30:19'),(198,'/terms',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:30:25'),(199,'/terms',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:35:04'),(200,'/terms',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:39:06'),(201,'/terms',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36','sess_drkix3yv3wb','172.18.0.1','2026-10-08 15:49:38');
/*!40000 ALTER TABLE `page_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'blog.create','Create Blogs','blog','Create new blog posts','2026-10-06 19:56:24'),(2,'blog.edit','Edit Blogs','blog','Edit existing blog posts','2026-10-06 19:56:24'),(3,'blog.delete','Delete Blogs','blog','Delete blog posts','2026-10-06 19:56:24'),(4,'blog.publish','Publish Blogs','blog','Publish blog posts','2026-10-06 19:56:24'),(5,'blog.approve','Approve Blogs','blog','Approve blog posts for publishing','2026-10-06 19:56:24'),(6,'blog.archive','Archive Blogs','blog','Archive blog posts','2026-10-06 19:56:24'),(7,'job.create','Create Jobs','job','Create new job postings','2026-10-06 19:56:24'),(8,'job.edit','Edit Jobs','job','Edit existing job postings','2026-10-06 19:56:24'),(9,'job.delete','Delete Jobs','job','Delete job postings','2026-10-06 19:56:24'),(10,'job.publish','Publish Jobs','job','Publish job postings','2026-10-06 19:56:24'),(11,'job.close','Close Jobs','job','Close job postings','2026-10-06 19:56:24'),(12,'job.manage_applications','Manage Applications','job','View and manage job applications','2026-10-06 19:56:24'),(13,'user.create','Create Users','user','Create new admin users','2026-10-06 19:56:24'),(14,'user.edit','Edit Users','user','Edit existing users','2026-10-06 19:56:24'),(15,'user.delete','Delete Users','user','Delete users','2026-10-06 19:56:24'),(16,'user.assign_roles','Assign Roles','user','Assign roles to users','2026-10-06 19:56:24'),(17,'media.upload','Upload Media','media','Upload media files','2026-10-06 19:56:24'),(18,'media.delete','Delete Media','media','Delete media files','2026-10-06 19:56:24'),(19,'analytics.view','View Analytics','analytics','View analytics and reports','2026-10-06 19:56:24'),(20,'settings.manage','Manage Settings','settings','Manage system settings','2026-10-06 19:56:24'),(41,'cms.edit','Edit Website Content','cms','Edit header, footer, and client content','2026-10-06 19:57:25'),(42,'cms.delete','Delete Website Content','cms','Delete header, footer, and client content','2026-10-06 19:57:25');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_role_permission` (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1,19,'2026-10-06 19:56:24'),(2,1,5,'2026-10-06 19:56:24'),(3,1,6,'2026-10-06 19:56:24'),(4,1,1,'2026-10-06 19:56:24'),(5,1,3,'2026-10-06 19:56:24'),(6,1,2,'2026-10-06 19:56:24'),(7,1,4,'2026-10-06 19:56:24'),(8,1,11,'2026-10-06 19:56:24'),(9,1,7,'2026-10-06 19:56:24'),(10,1,9,'2026-10-06 19:56:24'),(11,1,8,'2026-10-06 19:56:24'),(12,1,12,'2026-10-06 19:56:24'),(13,1,10,'2026-10-06 19:56:24'),(14,1,18,'2026-10-06 19:56:24'),(15,1,17,'2026-10-06 19:56:24'),(16,1,20,'2026-10-06 19:56:24'),(17,1,16,'2026-10-06 19:56:24'),(18,1,13,'2026-10-06 19:56:24'),(19,1,15,'2026-10-06 19:56:24'),(20,1,14,'2026-10-06 19:56:24'),(32,2,1,'2026-10-06 19:56:25'),(33,2,2,'2026-10-06 19:56:25'),(34,2,3,'2026-10-06 19:56:25'),(35,2,4,'2026-10-06 19:56:25'),(36,2,5,'2026-10-06 19:56:25'),(37,2,6,'2026-10-06 19:56:25'),(38,2,7,'2026-10-06 19:56:25'),(39,2,8,'2026-10-06 19:56:25'),(40,2,9,'2026-10-06 19:56:25'),(41,2,10,'2026-10-06 19:56:25'),(42,2,11,'2026-10-06 19:56:25'),(43,2,12,'2026-10-06 19:56:25'),(44,2,13,'2026-10-06 19:56:25'),(45,2,14,'2026-10-06 19:56:25'),(46,2,15,'2026-10-06 19:56:25'),(47,2,16,'2026-10-06 19:56:25'),(48,2,17,'2026-10-06 19:56:25'),(49,2,18,'2026-10-06 19:56:25'),(50,2,19,'2026-10-06 19:56:25'),(51,2,20,'2026-10-06 19:56:25'),(63,3,1,'2026-10-06 19:56:25'),(64,3,2,'2026-10-06 19:56:25'),(65,3,4,'2026-10-06 19:56:25'),(66,4,7,'2026-10-06 19:56:25'),(67,4,8,'2026-10-06 19:56:25'),(68,4,9,'2026-10-06 19:56:25'),(69,4,10,'2026-10-06 19:56:25'),(70,4,11,'2026-10-06 19:56:25'),(71,4,12,'2026-10-06 19:56:25'),(73,5,1,'2026-10-06 19:56:25'),(74,5,2,'2026-10-06 19:56:25'),(75,5,3,'2026-10-06 19:56:25'),(76,5,4,'2026-10-06 19:56:25'),(77,5,5,'2026-10-06 19:56:25'),(78,5,6,'2026-10-06 19:56:25'),(79,5,17,'2026-10-06 19:56:25'),(80,5,18,'2026-10-06 19:56:25'),(93,1,41,'2026-10-06 19:57:25'),(94,2,41,'2026-10-06 19:57:25'),(95,1,42,'2026-10-06 19:57:25'),(96,2,42,'2026-10-06 19:57:25');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super_admin','Super Admin','Full access to all system features','2026-10-06 19:56:24','2026-10-06 19:56:24'),(2,'admin','Admin','Manage content, jobs, users, media, analytics','2026-10-06 19:56:24','2026-10-06 19:56:24'),(3,'editor','Editor','Create/edit/publish blogs','2026-10-06 19:56:24','2026-10-06 19:56:24'),(4,'hr_recruiter','HR/Recruiter','Manage jobs and applications','2026-10-06 19:56:24','2026-10-06 19:56:24'),(5,'content_manager','Content Manager','Manage blogs, categories, tags, authors and media','2026-10-06 19:56:24','2026-10-06 19:56:24');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_404_logs`
--

DROP TABLE IF EXISTS `seo_404_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seo_404_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referrer` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hits` int DEFAULT '1',
  `last_detected` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `resolved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_404_logs`
--

LOCK TABLES `seo_404_logs` WRITE;
/*!40000 ALTER TABLE `seo_404_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `seo_404_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_global_settings`
--

DROP TABLE IF EXISTS `seo_global_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seo_global_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_global_settings`
--

LOCK TABLES `seo_global_settings` WRITE;
/*!40000 ALTER TABLE `seo_global_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `seo_global_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_metadata`
--

DROP TABLE IF EXISTS `seo_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seo_metadata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entity_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` text COLLATE utf8mb4_unicode_ci,
  `meta_keywords` text COLLATE utf8mb4_unicode_ci,
  `canonical_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `og_description` text COLLATE utf8mb4_unicode_ci,
  `og_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_description` text COLLATE utf8mb4_unicode_ci,
  `twitter_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `robots` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `structured_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_entity` (`entity_type`,`entity_id`),
  KEY `idx_entity` (`entity_type`,`entity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_metadata`
--

LOCK TABLES `seo_metadata` WRITE;
/*!40000 ALTER TABLE `seo_metadata` DISABLE KEYS */;
INSERT INTO `seo_metadata` VALUES (1,'page','home','TGSTECH Info',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-07 13:59:16','2026-10-07 14:29:32');
/*!40000 ALTER TABLE `seo_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_redirects`
--

DROP TABLE IF EXISTS `seo_redirects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seo_redirects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `old_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('301','302') COLLATE utf8mb4_unicode_ci DEFAULT '301',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `hits` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_redirects`
--

LOCK TABLES `seo_redirects` WRITE;
/*!40000 ALTER TABLE `seo_redirects` DISABLE KEYS */;
/*!40000 ALTER TABLE `seo_redirects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_name` (`key_name`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site_name','Taraj Global','2026-10-06 15:49:09','2026-10-06 15:49:09',NULL,NULL),(2,'site_description','Transforming businesses through innovation','2026-10-06 15:49:09','2026-10-06 15:49:09',NULL,NULL),(3,'contact_email','info@tarajglobal.com','2026-10-06 15:49:09','2026-10-06 15:49:09',NULL,NULL),(4,'contact_phone','+1 234 567 890','2026-10-06 15:49:09','2026-10-06 15:49:09',NULL,NULL),(5,'cms_blog_auto_publish','false','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(6,'cms_blog_require_approval','true','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(7,'cms_job_auto_publish','false','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(8,'cms_max_upload_size','10485760','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(9,'cms_allowed_image_types','jpg,jpeg,png,webp,svg','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(10,'cms_allowed_document_types','pdf,doc,docx','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(11,'cms_site_name','Taraj Global','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(12,'cms_site_description','Transforming businesses through innovation','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(13,'cms_contact_email','info@tarajglobal.com','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(14,'cms_contact_phone','+91 96655-99442','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(15,'cms_social_linkedin','','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(16,'cms_social_twitter','','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(17,'cms_social_facebook','','2026-10-06 19:57:24','2026-10-06 19:57:24',NULL,NULL),(18,'cms_clients_eyebrow','GLOBAL PARTNERSHIPS','2026-10-07 13:19:29','2026-10-07 13:19:29',NULL,'Eyebrow badge text for clients section'),(19,'cms_clients_title_white','TRUSTED BY','2026-10-07 13:19:29','2026-10-07 13:19:29',NULL,'White part of clients section title'),(20,'cms_clients_title_gradient','LEADING B2B BRANDS','2026-10-07 13:19:29','2026-10-07 13:19:29',NULL,'Gradient part of clients section title'),(21,'cms_clients_subtitle','Building demand with the technology ecosystem trusted by modern enterprises.','2026-10-07 13:19:29','2026-10-07 13:19:29',NULL,'Supporting subtitle for clients section'),(22,'cms_clients_visible','1','2026-10-07 13:19:29','2026-10-07 13:19:29',NULL,'Whether the clients section is visible on homepage'),(23,'cms_logo_url','/middle.png','2026-10-07 13:19:30','2026-10-07 13:19:30',NULL,'Website company logo URL'),(24,'cms_logo_text','Taraj Global','2026-10-07 13:20:04','2026-10-07 13:20:04',NULL,'Website logo brand text'),(25,'cms_logo_alt','Taraj Global - B2B Growth & Lead Generation Agency','2026-10-07 13:20:04','2026-10-07 13:20:04',NULL,'Website logo alt text'),(26,'cms_header_visible','0','2026-10-07 13:20:04','2026-10-07 13:51:04',NULL,'Show or hide top header bar'),(27,'cms_show_logo_text','0','2026-10-07 13:20:04','2026-10-07 13:51:22',NULL,'Display brand text beside header logo image');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `post_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user','super_admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','inactive','suspended') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `failed_login_attempts` int DEFAULT '0',
  `locked_until` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@tarajglobal.com','$2b$12$QTh2CGy4bn9pF3P.30OTheEwjCwC0/tnOlVlbnlWjvhyQ0zNG6n2y','admin','/uploads/avatars/1791399863402-407087797.png',NULL,NULL,'2026-10-06 15:49:09','2026-10-08 14:32:17','active','2026-10-08 14:32:17',NULL,0,NULL),(3,'saee','saee@example.com','$2b$10$TElJAfKVy0PgP4E8/Nr8N.uncPjpFZfgOTOFIDPG.gluwUuvqYxAi','admin',NULL,NULL,NULL,'2026-10-07 18:21:03','2026-10-07 18:22:38','active','2026-10-07 18:22:38',NULL,0,NULL),(5,'alex','alex@example.com','$2b$12$nwvIbgfoSlfke40UgYl5E.HmGtMl6qwsTTnMLk2qa68UjptrKLKoO','user','/uploads/avatars/1791403606497-954480265.png',NULL,NULL,'2026-10-07 18:57:43','2026-10-07 20:06:46','active','2026-10-07 19:54:07',NULL,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tarajglobal'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-08 19:21:03
