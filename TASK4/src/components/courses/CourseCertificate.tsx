import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

interface CourseCertificateProps {
  courseTitle: string
  completionDate: string
  instructor: string
}

const CourseCertificate = ({ courseTitle, completionDate, instructor }: CourseCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthStore()

  const downloadCertificate = async () => {
    if (!certificateRef.current) return

    try {
      const canvas = await html2canvas(certificateRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`)
    } catch (error) {
      console.error('Failed to generate certificate:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-16 border-8 border-primary/20 rounded-lg relative"
      >
        {/* Certificate Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Certificate of Completion</h1>
          <p className="text-lg text-gray-600">This is to certify that</p>
          <p className="text-3xl font-bold text-primary mt-4">{user?.name}</p>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600">has successfully completed the course</p>
          <p className="text-2xl font-bold text-gray-900 mt-4">{courseTitle}</p>
          <p className="text-lg text-gray-600 mt-4">
            on {new Date(completionDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Certificate Footer */}
        <div className="flex justify-between items-end mt-16">
          <div className="text-center">
            <div className="w-40 h-px bg-gray-300" />
            <p className="mt-2 text-gray-600">{instructor}</p>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
          <div className="text-center">
            <img
              src="/certificate-seal.png"
              alt="Certificate Seal"
              className="w-24 h-24 mx-auto"
            />
          </div>
          <div className="text-center">
            <div className="w-40 h-px bg-gray-300" />
            <p className="mt-2 text-gray-600">EduPlatform</p>
            <p className="text-sm text-gray-500">Platform</p>
          </div>
        </div>

        {/* Certificate Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 border-4 border-primary/5 m-8 rounded" />
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-primary/10" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-primary/10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-primary/10" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-primary/10" />
        </div>
      </motion.div>

      {/* Download Button */}
      <div className="mt-8 text-center">
        <button
          onClick={downloadCertificate}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Download Certificate
        </button>
      </div>
    </div>
  )
}

export default CourseCertificate 