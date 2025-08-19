import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'

type RotateAnimation = {
  initial: {
    scale: number
    rotate: number
  }
  animate: {
    scale: number
    rotate: number
  }
  exit: {
    scale: number
    rotate: number
  }
}
type ZoomAnimation = {
  initial: {
    scale: number
  }
  animate: {
    scale: number
  }
  exit: {
    scale: number
  }
}

type Animation = RotateAnimation | ZoomAnimation

type ModalProps = {
  onClose: () => void
  showCloseButton?: boolean
  children: React.ReactNode
  size?: {
    width: string
    height: string
  }
  animation?: Animation
  transition?: {
    type: 'spring' | 'tween' | 'inertia'
    duration: number
    bounce: number
  }
}

export const defaultAnimation: {
  [key: string]: Animation
} = {
  ROTATE: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 },
  },
  ZOOM: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  },
}

export default function Modal({
  onClose,
  showCloseButton = true,
  children,
  animation = defaultAnimation.ROTATE,
  transition = {
    type: 'spring',
    duration: 0.8,
    bounce: 0.4,
  },
  size = {
    width: '80%',
    height: '80%',
  },
}: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      data-testid="winner-modal"
    >
      <motion.div
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={transition}
        className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl text-white text-center w-[${size.width}] h-[${size.height}] mx-4 relative overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        data-testid="result-display"
      >
        {showCloseButton && (
          <div className="absolute top-4 right-4 z-100">
            <Button
              size="icon"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 backdrop-blur-sm text-white rounded-xl font-semibold transition-all duration-200 border border-white/30"
              data-testid="button-close-modal"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="absolute -top-1 right-4 w-3 h-3 bg-yellow-200 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-3 -right-2 w-5 h-5 bg-orange-200 rounded-full animate-bounce delay-500"></div>
          <div className="absolute -bottom-2 left-4 w-4 h-4 bg-red-200 rounded-full animate-bounce delay-300"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-bounce delay-700"></div>
        </div>
        {children}
      </motion.div>
    </motion.div>
  )
}
