import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, RefreshCcw, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { Modal } from '../components/Modal'
import { PrimaryButton } from '../components/PrimaryButton'
import { PageShell } from '../components/PageShell'
import { ShareCard } from '../components/ShareCard'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { calculateResult } from '../utils/results'

const shareUrl = 'https://the-algorithm-slot-machine.local'

export function Share() {
  useRouteProgress('share')
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const state = useGameStore()
  const resetGame = useGameStore((store) => store.resetGame)
  const result = calculateResult(state)
  const shareText = `I played The Algorithm Slot Machine.\n\nMy result:\n${result.personality}\n\nHow much does social media influence YOUR choices?\n\nPlay and find out.`

  const generateImageFile = async () => {
    if (!cardRef.current) {
      return null
    }

    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
    const response = await fetch(dataUrl)
    const blob = await response.blob()

    return new File([blob], 'algorithm-slot-machine-result.png', {
      type: 'image/png',
    })
  }

  const share = async () => {
    const file = await generateImageFile()

    if (
      navigator.share &&
      file &&
      (!navigator.canShare || navigator.canShare({ files: [file] }))
    ) {
      await navigator.share({
        title: 'THE ALGORITHM SLOT MACHINE',
        text: shareText,
        files: [file],
      })
      return
    }

    if (navigator.share) {
      await navigator.share({
        title: 'THE ALGORITHM SLOT MACHINE',
        text: shareText,
      })
      return
    }

    await download()
  }

  const download = async () => {
    const file = await generateImageFile()

    if (!file) {
      return
    }

    const dataUrl = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.download = file.name
    link.href = dataUrl
    link.click()
    URL.revokeObjectURL(dataUrl)
  }

  const replay = () => {
    resetGame()
    navigate('/')
  }

  return (
    <PageShell className="justify-center pb-24">
      <section className="mx-auto grid w-full max-w-5xl items-center gap-7 lg:grid-cols-[1fr_0.9fr]">
        <div ref={cardRef}>
          <ShareCard result={result} />
        </div>
        <div>
          <p className="text-sm font-black uppercase text-secondary">
            Share Result
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">
            Send your result into the feed.
          </h2>
          <p className="mt-4 whitespace-pre-line rounded-lg border border-white/10 bg-card p-4 text-sm leading-6 text-slate-300">
            {shareText}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PrimaryButton onClick={share}>
              <Share2 size={18} aria-hidden="true" />
              Share
            </PrimaryButton>
            <PrimaryButton tone="secondary" onClick={download}>
              <Download size={18} aria-hidden="true" />
              Save Card
            </PrimaryButton>
            <FacebookShareButton url={shareUrl} hashtag="#AlgorithmSlotMachine">
              <span className="flex min-h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-black uppercase text-white">
                Facebook
              </span>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareText}>
              <span className="flex min-h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-black uppercase text-white">
                X
              </span>
            </TwitterShareButton>
            <PrimaryButton
              className="sm:col-span-2"
              tone="ghost"
              onClick={() => setModalOpen(true)}
            >
              <RefreshCcw size={18} aria-hidden="true" />
              Replay
            </PrimaryButton>
          </div>
        </div>
      </section>
      <Modal
        title="Start a new game?"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <p>
          Starting a new game will erase your current progress and analysis.
        </p>
        <p className="mt-3">Are you sure you want to begin again?</p>
        <div className="mt-5 flex gap-3">
          <PrimaryButton tone="ghost" onClick={() => setModalOpen(false)}>
            Continue Playing
          </PrimaryButton>
          <PrimaryButton onClick={replay}>
            Start Fresh
          </PrimaryButton>
        </div>
      </Modal>
    </PageShell>
  )
}
