import { AnimatePresence, motion } from 'framer-motion'
import { Cog, Save, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { useAppContext } from '@/contexts/app-context'
import { Switch } from '@/components/ui/switch'

const formSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  winnerPerSpin: z.number(),
  maxWinners: z.number(),
  startNumber: z.number(),
  numOfParticipants: z.number(),
  paddedNumber: z.number(),
  isSoundEnabled: z.boolean(),
})

export default function Header() {
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsModalPosition, setSettingsModalPosition] = useState({
    x: 0,
    y: 0,
  })
  const { settings, setSettings } = useAppContext()
  console.log(settings)

  const settingsForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: settings.title,
      subtitle: settings.subtitle,
      winnerPerSpin: settings.winnerPerSpin,
      maxWinners: settings.maxWinners,
      startNumber: settings.startNumber,
      numOfParticipants: settings.numOfParticipants,
      paddedNumber: settings.paddedNumber,
      isSoundEnabled: settings.isSoundEnabled,
    },
  })

  const settingsButtonRef = useRef<HTMLButtonElement>(null)

  const closeSettingsModal = () => {
    setShowSettingsModal(false)
  }

  const toggleSettingsModal = () => {
    if (settingsButtonRef.current) {
      const rect = settingsButtonRef.current.getBoundingClientRect()
      setSettingsModalPosition({
        x: rect.left,
        y: rect.top,
      })
    }
    setShowSettingsModal(!showSettingsModal)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSettings(values)
    setShowSettingsModal(false)
  }

  return (
    <>
      <header className="p-2 flex bg-white text-black justify-around items-center">
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-blue-800 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {settings.title}
          </h1>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-700 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            {settings.subtitle}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSettingsModal}
            ref={settingsButtonRef}
          >
            <Cog />
          </Button>
        </div>
      </header>
      <AnimatePresence>
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            data-testid="winner-modal"
            onClick={closeSettingsModal}
          >
            <motion.div
              initial={{
                scale: 0,
                y: settingsModalPosition.y - window.innerHeight / 2,
                x: settingsModalPosition.x - window.innerWidth / 2,
              }}
              animate={{ scale: 1, y: 0, x: 0 }}
              exit={{
                scale: 0,
                y: settingsModalPosition.y - window.innerHeight / 2,
                x: settingsModalPosition.x - window.innerWidth / 2,
              }}
              transition={{
                type: 'spring',
                duration: 0.8,
                bounce: 0.4,
              }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl text-white text-center w-[80%]  max-w-2xl h-[430px] mx-4 relative overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-testid="result-display"
            >
              <div className="absolute top-0 left-0 w-full h-full z-100 p-8">
                <Form {...settingsForm}>
                  <form onSubmit={settingsForm.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                      <FormField
                        control={settingsForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-amber-50 text-black"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={settingsForm.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Subtitle
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full bg-amber-50 text-black"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={settingsForm.control}
                          name="numOfParticipants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Number of Participants
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                  }}
                                  className="w-full bg-amber-50 text-black"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={settingsForm.control}
                          name="startNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Start Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                  }}
                                  className="w-full bg-amber-50 text-black"
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={settingsForm.control}
                          name="paddedNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Padded Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                  }}
                                  className="w-full bg-amber-50 text-black"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <FormField
                          control={settingsForm.control}
                          name="winnerPerSpin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Winner Per Spin
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                  }}
                                  className="w-full bg-amber-50 text-black"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={settingsForm.control}
                          name="maxWinners"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Max Winners
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseInt(e.target.value, 10))
                                  }}
                                  className="w-full bg-amber-50 text-black"
                                  type="number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={settingsForm.control}
                          name="isSoundEnabled"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-black">
                                Sound Enabled
                              </FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-10">
                      <Button
                        type="submit"
                        className="bg-emerald-700 text-white hover:bg-emerald-500"
                      >
                        <Save />
                        Save
                      </Button>
                      <Button
                        type="button"
                        className="bg-red-700 text-white hover:bg-red-500"
                        onClick={closeSettingsModal}
                      >
                        <X />
                        Close
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
              {/* Confetti Effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full animate-bounce"></div>
                <div className="absolute -top-1 right-4 w-3 h-3 bg-yellow-200 rounded-full animate-bounce delay-200"></div>
                <div className="absolute top-3 -right-2 w-5 h-5 bg-orange-200 rounded-full animate-bounce delay-500"></div>
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-red-200 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-bounce delay-700"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
