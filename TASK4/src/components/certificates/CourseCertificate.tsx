import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import QRCode from 'qrcode.react'

interface CourseCertificateProps {
  courseId: string
  courseTitle: string
  completionDate: string
  instructor: string
  certificateId: string
  duration: string
  skills: string[]
}

const CourseCertificate = ({
  courseId,
  courseTitle,
  completionDate,
  instructor,
  certificateId,
  duration,
  skills,
}: CourseCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const verificationUrl = `https://yourplatform.com/verify/${certificateId}`

  const downloadCertificate = async (format: 'pdf' | 'png') => {
    if (!certificateRef.current) return
    setIsGenerating(true)

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      if (format === 'png') {
        const link = document.createElement('a')
        link.download = `${courseTitle.replace(/\s+/g, '_')}_Certificate.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
      } else {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        })

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
        pdf.save(`${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`)
      }
    } catch (error) {
      console.error('Failed to generate certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <motion.div
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-16 border-8 border-primary/20 rounded-lg relative"
        >
          {/* Certificate Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
                Certificate of Completion
              </h1>
              <p className="text-lg text-gray-600">This is to certify that</p>
              <p className="text-2xl md:text-3xl font-bold text-primary mt-4">
                {user?.name}
              </p>
            </motion.div>
          </div>

          {/* Certificate Body */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8 md:mb-12"
          >
            <p className="text-lg text-gray-600">has successfully completed</p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
              {courseTitle}
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              A {duration} course completed on{' '}
              {new Date(completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Certificate Footer */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-16"
          >
            <div className="text-center mb-4 md:mb-0">
              <div className="w-40 h-px bg-gray-300" />
              <p className="mt-2 text-gray-600">{instructor}</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>

            <div className="text-center mb-4 md:mb-0">
              <QRCode
                value={verificationUrl}
                size={96}
                level="H"
                className="mx-auto"
              />
              <p className="text-xs text-gray-500 mt-2">
                Certificate ID: {certificateId}
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 h-px bg-gray-300" />
              <p className="mt-2 text-gray-600">EduPlatform</p>
              <p className="text-sm text-gray-500">Platform</p>
            </div>
          </motion.div>

          {/* Certificate Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-4 border-primary/5 m-8 rounded" />
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/10" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary/10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary/10" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/10" />
          </div>
        </motion.div>

        {/* Download Options */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => downloadCertificate('pdf')}
            disabled={isGenerating}
            className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => downloadCertificate('png')}
            disabled={isGenerating}
            className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download PNG
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPreview(true)}
            className="w-full md:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Share Certificate
          </motion.button>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share Your Achievement
              </h3>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 flex items-center justify-center space-x-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <span>Share on LinkedIn</span>
                </button>
                <button className="w-full px-4 py-2 flex items-center justify-center space-x-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">
                  <span>Share on Twitter</span>
                </button>
                <div className="relative">
                  <input
                    type="text"
                    value={verificationUrl}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-20"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(verificationUrl)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CourseCertificate 