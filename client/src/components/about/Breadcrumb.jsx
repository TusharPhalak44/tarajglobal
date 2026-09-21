import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = () => {
  return (
    <nav className="py-4 bg-gray-50" aria-label="Breadcrumb">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight size={16} className="text-gray-400" />
          </li>
          <li className="text-gray-900 font-medium" aria-current="page">
            About Us
          </li>
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumb
