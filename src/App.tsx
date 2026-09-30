import { useState, useEffect, useRef, useSyncExternalStore } from 'react'

const assetPathPrefix = `${import.meta.env.BASE_URL}assets`

const UNLOCK_START = new Date(2026, 8, 18) // Sep 18, 2026

let textSize: number = 36

function getCardUnlockDate(index: number): Date {
  const d = new Date(UNLOCK_START)
  d.setDate(d.getDate() + index)
  return d
}

function isCardUnlocked(index: number): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const unlock = getCardUnlockDate(index)
  unlock.setHours(0, 0, 0, 0)
  return today >= unlock
}

function CardFrontSvg({ month, day, locked, unlockDate, uid, className }: {
  month: number; day: number; locked: boolean; unlockDate: string; uid: string; className?: string
}) {
  const fg = locked ? 'rgba(255,255,255,0.5)' : 'white'
  const bg = locked ? '#B8BCCC00' : '#ffdde300'
  const numSize = (n: number) => n >= 10 ? '13' : '17'

  return (
    <svg className={className} width="240" height="479" viewBox="0 0 240 479" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="479" rx="20" fill={bg}/>

      {/* Top-left: month number + heart */}
      <g clipPath={`url(#${uid}a)`}>
        <text x="36.2" y="47" textAnchor="middle" fontSize={textSize} fill={fg} fontFamily="'Angela', sans-serif" fontWeight="700">{month}</text>
        <path d="M43.1629 64.0114C41.5098 64.0114 40.0349 64.8796 39.0709 66.2368L36.2105 69.7646V69.7531L33.3501 66.2254C32.3861 64.8682 30.9112 64 29.2581 64C26.3542 64 24 66.6781 24 69.9819C24 72.885 26.1655 75.0548 27.7333 77.1393C29.2955 79.216 30.8575 81.2924 32.4194 83.369L35.926 88.0304C36.0209 88.1565 36.1156 88.2824 36.2105 88.4086V88.42C36.3055 88.2938 36.4001 88.168 36.495 88.0418C37.6638 86.4881 38.8326 84.9345 40.0016 83.3805C41.5636 81.3038 43.1258 79.2274 44.6878 77.1508C46.2556 75.0666 48.4211 72.8967 48.4211 69.9934C48.4211 66.6896 46.0669 64.0114 43.1629 64.0114Z" fill={fg}/>
      </g>

      {/* Center: 6 hearts (unlocked) or lock + date (locked) */}
      <g clipPath={`url(#${uid}b)`}>
        {locked ? (
          <>
            <g transform="translate(120 224)">
              <path d="M-9 -4 L-9 -13 Q-9 -21 0 -21 Q9 -21 9 -13 L9 -4" stroke={fg} strokeWidth="3" fill="none" strokeLinecap="round"/>
              <rect x="-13" y="-4" width="26" height="21" rx="4" fill={fg}/>
              <circle cx="0" cy="6" r="3.5" fill={bg}/>
              <rect x="-1.5" y="6" width="3" height="5" rx="1" fill={bg}/>
            </g>
            <text x="120" y="268" textAnchor="middle" fontSize={textSize} fill={fg} fontFamily="'Angela', sans-serif" fontWeight="700">{unlockDate}</text>
          </>
        ) : (
          <>
            <path d="M109.742 192.881C108.089 192.881 106.614 193.75 105.65 195.107L102.789 198.635V198.623L99.929 195.095C98.9651 193.738 97.4902 192.87 95.8371 192.87C92.9331 192.87 90.5789 195.548 90.5789 198.852C90.5789 201.755 92.7444 203.925 94.3122 206.009C95.8744 208.086 97.4364 210.162 98.9984 212.239L102.505 216.9C102.6 217.027 102.695 217.152 102.789 217.279V217.29C102.884 217.164 102.979 217.038 103.074 216.912C104.243 215.358 105.412 213.804 106.581 212.25C108.143 210.174 109.705 208.097 111.267 206.021C112.835 203.937 115 201.767 115 198.863C115 195.56 112.646 192.881 109.742 192.881Z" fill="white"/>
            <path d="M109.742 227.301C108.089 227.301 106.614 228.17 105.65 229.527L102.789 233.055V233.043L99.929 229.515C98.9651 228.158 97.4902 227.29 95.8371 227.29C92.9331 227.29 90.5789 229.968 90.5789 233.272C90.5789 236.175 92.7444 238.345 94.3122 240.429C95.8744 242.506 97.4364 244.582 98.9984 246.659L102.505 251.32C102.6 251.447 102.695 251.572 102.789 251.699V251.71C102.884 251.584 102.979 251.458 103.074 251.332C104.243 249.778 105.412 248.224 106.581 246.67C108.143 244.594 109.705 242.517 111.267 240.441C112.835 238.357 115 236.187 115 233.283C115 229.98 112.646 227.301 109.742 227.301Z" fill="white"/>
            <path d="M109.742 261.721C108.089 261.721 106.614 262.59 105.65 263.947L102.789 267.475V267.463L99.929 263.935C98.9651 262.578 97.4902 261.71 95.8371 261.71C92.9331 261.71 90.5789 264.388 90.5789 267.692C90.5789 270.595 92.7444 272.765 94.3122 274.849C95.8744 276.926 97.4364 279.002 98.9984 281.079L102.505 285.74C102.6 285.866 102.695 285.992 102.789 286.119V286.13C102.884 286.004 102.979 285.878 103.074 285.752C104.243 284.198 105.412 282.644 106.581 281.09C108.143 279.014 109.705 276.937 111.267 274.861C112.835 272.777 115 270.607 115 267.703C115 264.4 112.646 261.721 109.742 261.721Z" fill="white"/>
            <path d="M144.163 192.881C142.51 192.881 141.035 193.75 140.071 195.107L137.211 198.635V198.623L134.35 195.095C133.386 193.738 131.911 192.87 130.258 192.87C127.354 192.87 125 195.548 125 198.852C125 201.755 127.165 203.925 128.733 206.009C130.295 208.086 131.857 210.162 133.419 212.239L136.926 216.9C137.021 217.027 137.116 217.152 137.211 217.279V137.29C137.305 217.164 137.4 217.038 137.495 216.912C138.664 215.358 139.833 213.804 141.002 212.25C142.564 210.174 144.126 208.097 145.688 206.021C147.256 203.937 149.421 201.767 149.421 198.863C149.421 195.56 147.067 192.881 144.163 192.881Z" fill="white"/>
            <path d="M144.163 227.301C142.51 227.301 141.035 228.17 140.071 229.527L137.211 233.055V233.043L134.35 229.515C133.386 228.158 131.911 227.29 130.258 227.29C127.354 227.29 125 229.968 125 233.272C125 236.175 127.165 238.345 128.733 240.429C130.295 242.506 131.857 244.582 133.419 246.659L136.926 251.32C137.021 251.447 137.116 251.572 137.211 251.699V251.71C137.305 251.584 137.4 251.458 137.495 251.332C138.664 249.778 139.833 248.224 141.002 246.67C142.564 244.594 144.126 242.517 145.688 240.441C147.256 238.357 149.421 236.187 149.421 233.283C149.421 229.98 147.067 227.301 144.163 227.301Z" fill="white"/>
            <path d="M144.163 261.721C142.51 261.721 141.035 262.59 140.071 263.947L137.211 267.475V267.463L134.35 263.935C133.386 262.578 131.911 261.71 130.258 261.71C127.354 261.71 125 264.388 125 267.692C125 270.595 127.165 272.765 128.733 274.849C130.295 276.926 131.857 279.002 133.419 281.079L136.926 285.74C137.021 285.866 137.116 285.992 137.211 286.119V286.13C137.305 286.004 137.4 285.878 137.495 285.752C138.664 284.198 139.833 282.644 141.002 281.09C142.564 279.014 144.126 276.937 145.688 274.861C147.256 272.777 149.421 270.607 149.421 267.703C149.421 264.4 147.067 261.721 144.163 261.721Z" fill="white"/>
          </>
        )}
      </g>

      {/* Bottom-right: heart + date number */}
      <g clipPath={`url(#${uid}c)`}>
        <path d="M196.837 414.989C198.49 414.989 199.965 414.12 200.929 412.763L203.789 409.235L203.789 409.247L206.65 412.775C207.614 414.132 209.089 415 210.742 415C213.646 415 216 412.322 216 409.018C216 406.115 213.835 403.945 212.267 401.861C210.704 399.784 209.143 397.708 207.581 395.631L204.074 390.97C203.979 390.843 203.884 390.718 203.789 390.591L203.789 390.58C203.695 390.706 203.6 390.832 203.505 390.958C202.336 392.512 201.167 394.066 199.998 395.62C198.436 397.696 196.874 399.773 195.312 401.849C193.744 403.933 191.579 406.103 191.579 409.007C191.579 412.31 193.933 414.989 196.837 414.989Z" fill={fg}/>
        <text x="203.8" y="446" textAnchor="middle" fontSize={textSize} fill={fg} fontFamily="'Angela', sans-serif" fontWeight="700">{day}</text>
      </g>

      <defs>
        <clipPath id={`${uid}a`}><rect width="32" height="431" fill="white" transform="translate(20 24)"/></clipPath>
        <clipPath id={`${uid}b`}><rect x="68.4211" y="24" width="103.158" height="431" rx="12" fill="white"/></clipPath>
        <clipPath id={`${uid}c`}><rect width="32" height="431" fill="white" transform="translate(220 455) rotate(-180)"/></clipPath>
      </defs>
    </svg>
  )
}

interface CardData {
  photo: string
  title: string
  artist: string
  youtubeId?: string // paste a YouTube video ID or full URL here to enable the play button
  lyrics: React.ReactNode
}

const cards: CardData[] = [
  {
    photo: `${assetPathPrefix}/4accf.png`,
    title: 'apple cider',
    artist: 'beabadoobee',
    youtubeId: 'laDnsiKURTQ',
    lyrics: <>It's really nice to talk to you<br />It's really nice to hold your hand</>,
  },
  {
    photo: `${assetPathPrefix}/fb014.png`,
    title: 'Seamless',
    artist: 'Sabrina Carpenter',
    youtubeId: 'XOM00lRndaw',
    lyrics: <>We're klutzy, but so lucky<br />That I always have you to catch me</>,
  },
  {
    photo: `${assetPathPrefix}/82b41.png`,
    title: 'Everything I want',
    artist: 'beabadoobee',
    youtubeId: 'PK-HMe3jFbw',
    lyrics: (
      <>
        Now I see, the weather's got me down
        <br />
        But like the sun, you'll come around
        <br />
        I had finally figured out
        <br />
        You were just around the corner
        <br />
        Oh, such a pretty sight
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/d62a6.png`,
    title: 'Staring',
    artist: "Tipling Rock",
    youtubeId: 'RXpe-kbDJE8',
    lyrics: <>You got me staring like a fool</>,
  },
  {
    photo: `${assetPathPrefix}/1266c.png`,
    title: 'warm',
    artist: 'Ariana Grande',
    youtubeId: 'u_JNpPN7Dfo',
    lyrics: (
      <>
        'Cause I'm cool
        <br />
        On my own
        <br />
        But it's warmer
        <br />
        In your arms
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/f9598.png`,
    title: 'Memories',
    artist: 'Beabadoobee',
    youtubeId: 'Hphaxxjz2Wc',
    lyrics: <>It's 3am and I thought of you<br />You're the best, you're my favorite</>,
  },
  {
    photo: `${assetPathPrefix}/3b9cb.png`,
    title: 'Kiss Me',
    artist: 'Sixpence None The Richer',
    youtubeId: 'CAC-onWPMB0',
    lyrics: (
      <>
        Lead me out on the moonlit floor
        <br />
        Lift your open hand
        <br />
        Strike up the band and make the fireflies dance
        <br />
        Silver moon's sparkling
        <br />
        So kiss me
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/5971c.png`,
    title: "Baby I'm Yours",
    artist: 'Arctic Monkeys',
    youtubeId: 'atYNqvZcQ3M',
    lyrics: <>And I'll be yours (yours) until the stars fall from the sky</>,
  },
  {
    photo: `${assetPathPrefix}/c2497.png`,
    title: 'stay',
    artist: 'Ariana Grande',
    youtubeId: '0J6tGMnBLlM',
    lyrics: (
      <>
        tongue tied
        <br />
        hard to speak but
        <br />
        oh my
        <br />
        i don't want to be
        <br />
        anywhere but by your side
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/64e10.png`,
    title: "Ain't No Mountain High Enough",
    artist: 'Marvin Gaye',
    youtubeId: 'oB9JIz72BoM',
    lyrics: (
      <>
        If you need me, call me
        <br />
        No matter where you are
        <br />
        No matter how far (don't worry, baby)
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/f40b9.png`,
    title: 'Seamless',
    artist: 'Sabrina Carpenter',
    youtubeId: 'XOM00lRndaw',
    lyrics: (
      <>
        You're right by my side whenever I need you
        <br />
        Through the hardest times
        <br />
        I'll be there for you
        <br />
        At the crack of dawn when the moon is gone
        <br />
        I won't be hard to find
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/2ce24.png`,
    title: 'Dandelions',
    artist: 'Ruth B.',
    youtubeId: 'W8a4sUabCUo',
    lyrics: (
      <>
        And I see forever in your eyes
        <br />
        I feel okay when I see you smile, smile
        <br />
        <br />
        (not in lyrics :p) happy not fake anniversary LOL
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/d0ef9.png`,
    title: 'pov',
    artist: 'Ariana Grande',
    youtubeId: 'nQJEp-k-ogs',
    lyrics: (
      <>
        It's like you got superpowers
        <br />
        Turn my minutes into hours
        <br />
        You got more than 20-20, babe
        <br />
        Made of glass, the way you see through me
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/2d8b4.png`,
    title: 'imagine',
    artist: 'Ariana Grande',
    youtubeId: 'oRcXOnLkM7A',
    lyrics: (
      <>
        Stayin' up all night, order me pad thai*
        <br />
        Then we gon' sleep 'til noon
        <br />
        <br />
        (not in lyrics :p) *pad see ew
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/25bc5.png`,
    title: 'u + me = <3',
    artist: 'Olivia Rodrigo',
    youtubeId: 'gOrmQcOolJI',
    lyrics: (
      <>
        And I got a feeling wounds are healing, talking on the phone
        <br />
        I know everybody changes, but I hope that we don't
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/46fd8.png`,
    title: 'Moonlight',
    artist: 'Ariana Grande',
    youtubeId: 'JC7826DhCjY',
    lyrics: (
      <>
        I be crushin' on you, baby
        <br />
        Stay the way you are
        <br />
        <br />
        (not in lyrics :p) HAPPY BOYFRIEND DAY MY CUTIE PATOOTIE &lt;333 
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/daf1d.png`,
    title: 'ordinary things',
    artist: 'Ariana Grande',
    youtubeId: '6XWMiMlZHfA',
    lyrics: (
      <>
        We could hang out at the Louvre all night if you want to
        <br />
        We could spend every dime
        <br />
        But I don't want anything but more time
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/7789e.png`,
    title: 'stay',
    artist: 'Ariana Grande',
    youtubeId: '0J6tGMnBLlM',
    lyrics: <>way too good to be true<br />can't find nothing wrong w you</>,
  },
  {
    photo: `${assetPathPrefix}/7cdc9.png`,
    title: 'pov',
    artist: 'Ariana Grande',
    youtubeId: 'nQJEp-k-ogs',
    lyrics: (
      <>
        I wanna love me (ooh)
        <br />
        The way that you love me (ooh)
        <br />
        Ooh, for all of my pretty and all of my ugly too
        <br />
        I'd love to see me from your point of view
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/a34a2.png`,
    title: 'Adore',
    artist: 'Ariana Grande',
    youtubeId: 'MdoB_kYLTGw',
    lyrics: <>Boy, so what's been on your mind?<br />For me, it's just you all the time</>,
  },
  {
    photo: `${assetPathPrefix}/0b649.png`,
    title: 'Why',
    artist: 'Sabrina Carpenter',
    youtubeId: 'fhH4pbRJh0k',
    lyrics: (
        <>
            Funny how the stars crossed right
            <br />
            'Cause we work so well and we don't even know why
        </>
    ),
  },
  {
    photo: `${assetPathPrefix}/4e147.png`,
    title: 'R.E.M',
    artist: 'Ariana Grande',
    youtubeId: 'AVPEP_KSldA',
    lyrics: <>You're such a dream to me</>,
  },
  {
    photo: `${assetPathPrefix}/7b261.png`,
    title: 'The Way',
    artist: 'Ariana Grande',
    youtubeId: '2O3AOhEufyo',
    lyrics: <>Be your lover, your friend, you'll find it all in me<br /><br />(not in lyrics :p) damn boy are u today's date cuz ur a 10/10</>,
  },
  {
    photo: `${assetPathPrefix}/d9c97.png`,
    title: '4Me 4Me',
    artist: 'Malcolm Todd',
    youtubeId: 's9i-W7a4ZVQ',
    lyrics: <>I miss you so persistently, I lose my head, then<br />I see you and I lose it again</>,
  },
  {
    photo: `${assetPathPrefix}/b45dd.png`,
    title: 'Attention',
    artist: 'Malcolm Todd',
    youtubeId: '5VBqMuaiwYk',
    lyrics: (
      <>
        I need attention now
        <br />
        Come here and just attack it all
        <br />
        You can bite my neck just a little too hard
        <br />
        <br />
        (not in lyrics :p) hehe
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/cc5dd.png`,
    title: "The Only Exception",
    artist: 'Paramore',
    youtubeId: 'ChXcD6Z4uvQ',
    lyrics: <>I'd never sing of love if it does not exist<br />But darling, you are the only exception</>,
  },
    {
    photo: `${assetPathPrefix}/34d02.png`,
    title: 'Hotel Room',
    artist: 'Ax and the Hatchetmen',
    youtubeId: '9Z1k8thLiNE',
    lyrics: (
      <>
        And I just wanna find myself in the middle of you
        <br />
        I'm all tied up in the middle of you
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/6d144.png`,
    title: 'One Call Away',
    artist: 'Charlie Puth',
    youtubeId: '3lcSFAItC4E',
    lyrics: <>And when you feel like hope is gone<br />Just run into my arms</>,
  },
  {
    photo: `${assetPathPrefix}/871e8.png`,
    title: 'Easy',
    artist: 'Camilla Cabello',
    youtubeId: 'X95tylIxAoc',
    lyrics: (
      <>
        You know me and you love me
        <br />
        And it's the kind of thing I always hoped I'd find (yeah)
        <br />
        Always thought I was hard to love
        <br />
        'Til you made it seem so easy (seem so easy)
      </>
    ),
  },
  {
    photo: `${assetPathPrefix}/f0ae9.png`,
    title: 'Everything I want',
    artist: 'beabadoobee',
    youtubeId: 'PK-HMe3jFbw',
    lyrics: (
      <>
        Couldn't list all of the reasons
        <br />
        You're everything I want
        <br />
        Fallin' more at every season
        <br />
        You're everything I want
      </>
    ),
  },
]

const cardShadow = '0px 1px 2px 0px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)'

const WELCOME_SEEN_KEY = 'hasSeenWelcomeModal'

const poppinsRegular: React.CSSProperties = {
  fontFamily: "'Angela'",
  fontStyle: 'normal',
  fontWeight: 400,
}

const poppinsItalic: React.CSSProperties = {
  fontFamily: "'Angela'",
  fontStyle: 'italic',
  fontWeight: 400,
}

/* ---------- Hidden shared YouTube player (single instance, one song at a time) ---------- */

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

/** Accepts a raw video ID or a full YouTube URL and returns just the ID. */
function extractYoutubeId(input: string): string {
  const trimmed = input.trim()
  const urlMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/)
  return urlMatch ? urlMatch[1] : trimmed
}

let ytApiPromise: Promise<any> | null = null
function loadYoutubeApi(): Promise<any> {
  if (ytApiPromise) return ytApiPromise
  ytApiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const existingCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.()
      resolve(window.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
  return ytApiPromise
}

type PlayerListener = () => void
let nowPlayingId: string | null = null
const playerListeners = new Set<PlayerListener>()
function notifyPlayerListeners() {
  playerListeners.forEach((cb) => cb())
}

// Two hidden players ("slots") so the NEXT song can be buffered while the current one plays.
// With a single player, every switch had to fetch + buffer from scratch after the click,
// which is where the delay came from. Now hovering/flipping a card cues its song in the idle
// slot, and clicking play just un-pauses an already-buffered video.
//
// Per-slot loadSeq / sawPlaying guard against a YouTube IFrame API quirk: loadVideoById() on a
// player that's already playing can fire a stray paused/ended event for the OLD video before the
// new one's "playing" event. We only honor a paused/ended event once the current load has been
// seen playing. We also ignore events from a slot that isn't the one nowPlayingId points at
// (e.g. the slot we just paused programmatically when switching songs).
interface Slot {
  player: any
  index: number
  videoId: string | null // what this slot currently has cued / playing / paused
  loadSeq: number
  sawPlaying: number
}

let activeSlot = 0
let slotsPromise: Promise<Slot[]> | null = null

function createSlot(YT: any, index: number): Promise<Slot> {
  return new Promise((resolve) => {
    const host = document.createElement('div')
    host.id = `hidden-youtube-player-${index}`
    document.body.appendChild(host)
    const slot: Slot = { player: null, index, videoId: null, loadSeq: 0, sawPlaying: -1 }
    slot.player = new YT.Player(host, {
      height: '1',
      width: '1',
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, playsinline: 1 },
      events: {
        onReady: () => resolve(slot),
        onStateChange: (e: any) => {
          if (e.data === 1) slot.sawPlaying = slot.loadSeq
          if (
            (e.data === 0 || e.data === 2) &&
            slot.sawPlaying === slot.loadSeq &&
            nowPlayingId !== null &&
            nowPlayingId === slot.videoId
          ) {
            nowPlayingId = null
            notifyPlayerListeners()
          }
        },
      },
    })
  })
}

function getSlots(): Promise<Slot[]> {
  if (slotsPromise) return slotsPromise
  slotsPromise = loadYoutubeApi().then((YT) => Promise.all([createSlot(YT, 0), createSlot(YT, 1)]))
  return slotsPromise
}

/** Which slot a new song should be loaded into: the idle one if something is playing. */
function targetSlot(slots: Slot[]): Slot {
  return nowPlayingId !== null ? slots[1 - activeSlot] : slots[activeSlot]
}

/** Pre-buffer a song so the eventual play click starts almost instantly. Never interrupts playback. */
async function prepareSong(rawId: string) {
  const id = extractYoutubeId(rawId)
  if (nowPlayingId === id) return
  const slots = await getSlots()
  if (nowPlayingId === id || slots.some((s) => s.videoId === id)) return
  const slot = targetSlot(slots)
  slot.videoId = id
  slot.player.cueVideoById(id)
}

async function toggleSongPlayback(rawId: string) {
  const id = extractYoutubeId(rawId)
  const slots = await getSlots()
  if (nowPlayingId === id) {
    slots[activeSlot].player.pauseVideo()
    nowPlayingId = null
  } else {
    const ready = slots.find((s) => s.videoId === id) // already cued (or paused) -> instant
    const slot = ready ?? targetSlot(slots)
    // Stop whatever is playing in the other slot when switching.
    if (nowPlayingId !== null && slot.index !== activeSlot) slots[activeSlot].player.pauseVideo()
    slot.loadSeq++
    if (ready) {
      slot.player.playVideo()
    } else {
      slot.videoId = id
      slot.player.loadVideoById(id) // autoplays
    }
    activeSlot = slot.index
    nowPlayingId = id
  }
  notifyPlayerListeners()
}

function useNowPlayingId(): string | null {
  return useSyncExternalStore(
    (cb) => {
      playerListeners.add(cb)
      return () => playerListeners.delete(cb)
    },
    () => nowPlayingId,
  )
}

function SongPlayButton({ youtubeId, title, artist }: { youtubeId?: string; title: string; artist: string }) {
  const playingId = useNowPlayingId()
  const cleanId = youtubeId ? extractYoutubeId(youtubeId) : ''
  const isPlaying = !!cleanId && playingId === cleanId
  const hasSong = !!cleanId

  return (
    <button
      type="button"
      data-play-button
      disabled={!hasSong}
      onPointerEnter={() => { if (hasSong) prepareSong(cleanId) }}
      onFocus={() => { if (hasSong) prepareSong(cleanId) }}
      onPointerDown={() => { if (hasSong) prepareSong(cleanId) }}
      onClick={(e) => {
        e.stopPropagation()
        if (hasSong) toggleSongPlayback(cleanId)
      }}
      aria-label={hasSong ? (isPlaying ? `Pause ${title}` : `Play ${title} by ${artist}`) : `No song linked for ${title}`}
      className="group shrink-0 flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
      style={{
        width: 30,
        height: 30,
        // play/pause button fill
        backgroundColor: '#ffdde3',
        cursor: hasSong ? 'pointer' : 'default',
        // play/pause button border
        border: '1.5px solid #3b3b3b',
      }}
    >
      {isPlaying ? (
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-150 group-hover:scale-125"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" fill="white" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="white" />
        </svg>
      ) : (
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-150 group-hover:scale-125"
        >
          {/* triangle with r=1.5 rounded corners, sized to match the original sharp M8 5v14l11-7-11-7z */}
          <path d="M9.66 5.235A1.5 1.5 0 0 0 7.354 6.5L7.354 17.5A1.5 1.5 0 0 0 9.66 18.765L18.303 13.265A1.5 1.5 0 0 0 18.303 10.735Z" fill="white" />
        </svg>
      )}
    </button>
  )
}


function BackContent({ card }: { card: CardData }) {
  return (
    <div className="w-full h-full flex flex-col pt-4 px-4 pb-3 overflow-hidden">
      {/* Square photo */}
      <div className="aspect-square w-full rounded-[12px] overflow-hidden shrink-0">
        <img
          alt=""
          src={card.photo}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      {/* Text below photo */}
      <div className="mt-[8px] flex flex-col gap-[6px] min-h-0">
        <div className="flex items-center justify-between gap-[8px]">
          <div className="flex flex-col gap-[2px] min-w-0">
            <p
              className="text-[#3b3b3b] text-[26px] leading-[23px] break-words"
              style={poppinsRegular}
            >
              {card.title}
            </p>
            <p
              className="text-[#878787] text-[20px] leading-[20px] break-words"
              style={poppinsRegular}
            >
              {card.artist}
            </p>
          </div>
          <SongPlayButton youtubeId={card.youtubeId} title={card.title} artist={card.artist} />
        </div>
        <p
          className="text-[#3b3b3b] text-[26px] leading-[23px] break-words"
          style={poppinsRegular}
        >
          {card.lyrics}
        </p>
      </div>
    </div>
  )
}

function FlipCard({ card, fixedHeight, index }: { card: CardData; fixedHeight?: number; index: number }) {
  const [flipped, setFlipped] = useState(() => {
    try {
      const saved = localStorage.getItem('flippedCards')
      // A locked card can never have been legitimately flipped through the click
      // handler (it returns early when locked), so ignore any stale "flipped" entry
      // left over from when isCardUnlocked briefly always returned true.
      return saved ? (JSON.parse(saved) as number[]).includes(index) && isCardUnlocked(index) : false
    } catch { return false }
  })
  const [everSeen, setEverSeen] = useState(() => {
    try {
      const saved = localStorage.getItem('seenCards')
      return saved ? (JSON.parse(saved) as number[]).includes(index) : false
    } catch { return false }
  })
  const [hovered, setHovered] = useState(false)

  const unlockDate = getCardUnlockDate(index)
  const locked = !isCardUnlocked(index)
  const month = unlockDate.getMonth() + 1
  const day = unlockDate.getDate()
  const unlockDateStr = `${month}/${day}`
  const faceBg = locked ? '#B8BCCC' : '#ffdde3'

  return (
    <div
      data-card
      data-locked={locked ? 'true' : undefined}
      className="relative"
      style={{
        perspective: '1000px',
        cursor: locked ? 'default' : 'pointer',
        transform: hovered && !locked && window.innerWidth >= 450 ? 'rotate(3deg) scale(1.03)' : 'rotate(0deg) scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        borderRadius: 20,
        boxShadow: !locked && !everSeen ? 'inset 0 0 0 5px #FFFFFF' : undefined,
      }}
      onClick={() => {
        if (locked) return
        setFlipped(f => {
          const next = !f
          try {
            const saved = localStorage.getItem('flippedCards')
            const arr: number[] = saved ? JSON.parse(saved) : []
            if (next) { if (!arr.includes(index)) arr.push(index) }
            else { const i = arr.indexOf(index); if (i !== -1) arr.splice(i, 1) }
            localStorage.setItem('flippedCards', JSON.stringify(arr))
            if (next) {
              const seen = localStorage.getItem('seenCards')
              const seenArr: number[] = seen ? JSON.parse(seen) : []
              if (!seenArr.includes(index)) {
                seenArr.push(index)
                localStorage.setItem('seenCards', JSON.stringify(seenArr))
                setEverSeen(true)
              }
            }
          } catch {}
          if (!next) setHovered(false)
          if (next && card.youtubeId) prepareSong(card.youtubeId)
          return next
        })
      }}
      onMouseEnter={() => { setHovered(true); if (!locked && card.youtubeId) prepareSong(card.youtubeId) }}
      onTouchStart={() => { if (!locked && card.youtubeId) prepareSong(card.youtubeId) }}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        data-spacer
        className="invisible pointer-events-none select-none"
        aria-hidden="true"
        style={fixedHeight ? { height: fixedHeight } : undefined}
      >
        {!fixedHeight && <BackContent card={card} />}
      </div>

      <div
        className={[
          'absolute inset-0',
          '[transform-style:preserve-3d]',
          'transition-[transform] duration-[600ms] ease-in-out',
          flipped ? '[transform:rotateY(180deg)]' : '',
        ].join(' ')}
      >
        {/* Front face — 1-col */}
        <div
          className="absolute inset-0 sm:hidden [backface-visibility:hidden] rounded-[20px] overflow-hidden p-[20px]"
          style={{ boxShadow: !locked && !everSeen ? `inset 0 0 0 5px white, ${cardShadow}` : cardShadow, backgroundColor: faceBg }}
        >
          <CardFrontSvg month={month} day={day} locked={locked} unlockDate={unlockDateStr} uid={`cf${index}`} className="w-full h-full pointer-events-none" />
        </div>

        {/* Front face — 2-col+ */}
        <div
          className="absolute inset-0 hidden sm:block [backface-visibility:hidden] rounded-[20px] overflow-hidden pt-4 px-4 pb-3"
          style={{ boxShadow: !locked && !everSeen ? `inset 0 0 0 5px white, ${cardShadow}` : cardShadow, backgroundColor: faceBg }}
        >
          <div className="w-full h-full rounded-[12px] overflow-hidden">
            <CardFrontSvg month={month} day={day} locked={locked} unlockDate={unlockDateStr} uid={`cf${index}`} className="w-full h-full pointer-events-none" />
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: cardShadow }}
        >
          <BackContent card={card} />
        </div>
      </div>
    </div>
  )
}

const SHOOTING_STARS = [
  { top: '8%',  left: '-5%',  mobileLeft: '-2%', delay: 0,    dur: 10, len: 230 },
  { top: '45%', left: '20%',  mobileLeft: '-2%', delay: 2.5,  dur: 10, len: 250 },
  { top: '15%', left: '60%',  mobileLeft: '-2%', delay: 5,    dur: 10, len: 220 },
  { top: '65%', left: '-3%',  mobileLeft: '-2%', delay: 7.5,  dur: 10, len: 240 },
]

function ShootingStars() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {SHOOTING_STARS.map((s, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            opacity: 0,
            animation: `shoot ${s.dur}s ${s.delay}s linear infinite`,
          }}
        >
          <div style={{
            width: s.len,
            height: 3,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5) 25%, white)',
            borderRadius: 3,
            transform: 'rotate(30deg)',
            boxShadow: '0 0 8px 2px rgba(255,255,255,0.6)',
          }} />
        </div>
      ))}
    </div>
  )
}

function sampleGradient(x: number, y: number): string {
  const angleRad = (155.997 * Math.PI) / 180
  const gdx = Math.sin(angleRad)
  const gdy = -Math.cos(angleRad)
  const W = window.innerWidth
  const H = window.innerHeight
  const proj = gdx * (x - W / 2) + gdy * (y - H / 2)
  const gradLen = gdx * W + gdy * H
  const t = Math.max(0, Math.min(1, proj / gradLen + 0.5))
  const r = Math.round(176 + (230 - 176) * t)
  const g = Math.round(173 + (173 - 173) * t)
  const b = Math.round(235 + (197 - 235) * t)
  return `rgb(${r},${g},${b})`
}

function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-[24px]"
      style={{ backgroundColor: 'rgba(59,59,59,0.45)', zIndex: 200 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[720px] max-h-[85vh] overflow-y-auto flex flex-col gap-[18px] px-[28px] py-[32px] tablet:px-[44px] tablet:py-[40px]"
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          border: '1.5px solid #3b3b3b',
          boxShadow: cardShadow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          to my pookie, my cutie patootie, my sunshine, the tuffest guy ever,
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          honestly, does she really like you if she doesn't vibe code a website for you?
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          i can't believe we're six months old!!
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          i know you aren't a lyrics guy, but i am (well, girl). a lot of songs have described feelings i could never put into words, and have said things i can't quite say myself.
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          some days i'm not in the best mood, so i wanted to give this to you so you know i care, and hopefully it makes your day better for when i'm not physically there, or for when things seem uncertain.
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          jia you fine shyt :)
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={{ fontFamily: "'Angela', cursive" }}>
          i am genuinely cheese at this point help. issok this is me getting my whimsy back hehe
        </p>
        {/* <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          -- last edited 9/29/26 at 10:43pm pacific time
        </p> */}

        {/* <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          to my pookie, my cutie patootie, my sunshine, the tuffest guy ever,
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          honestly, does she really like you if she doesn't vibe code a website for you?
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          i can't believe we're six months old!!
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          i know you aren't a lyrics guy, but i am (well, girl). i like songs that tell a story, that convey emotions in poetic ways. a lot of songs have described feelings i could never put into words, and have said things i can't quite say myself.
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          today i don't have a lot of words. lately it's been hard. but i wanted to give this to you so you know i care, and hopefully it makes your day better.
        </p>
        <p className="text-[#3b3b3b] text-[22px] tablet:text-[26px] leading-[27px] tablet:leading-[31px]" style={poppinsItalic}>
          jia you fine shyt :)
        </p> */}

        <div className="flex justify-center mt-[6px]">
          <button
            type="button"
            onClick={onClose}
            data-capy-cursor
            className="rounded-full transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#ffdde3',
              border: '1.5px solid #3b3b3b',
              padding: '10px 36px',
              cursor: 'pointer',
            }}
          >
            <span className="text-[#3b3b3b] text-[22px]" style={poppinsRegular}>Close</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function HeartCursor() {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const capyRef = useRef<HTMLImageElement>(null)
  const cursor = useRef({ x: -200, y: -200 })
  const heart = useRef({ x: -200, y: -200 })
  const overCard = useRef(false)
  const overPlayButton = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY }
      overCard.current = !!(e.target as Element)?.closest?.('[data-card]:not([data-locked])') || !!(e.target as Element)?.closest?.('[data-capy-cursor]')
      overPlayButton.current = !!(e.target as Element)?.closest?.('[data-play-button]')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let raf: number
    const tick = () => {
      const lerp = 0.12
      heart.current.x += (cursor.current.x - heart.current.x) * lerp
      heart.current.y += (cursor.current.y - heart.current.y) * lerp

      const svg = svgRef.current
      const path = pathRef.current
      if (svg && path) {
        svg.style.left = `${heart.current.x - 20}px`
        svg.style.top = `${heart.current.y - 20}px`
        const hovering = overCard.current

svg.style.width = hovering ? '0px' : '33px'
svg.style.height = hovering ? '0px' : '33px'
svg.style.opacity = overPlayButton.current ? '0' : '1'

const capy = capyRef.current

if (capy) {
  capy.style.left = `${heart.current.x - 21}px`
  capy.style.top = `${heart.current.y - 21}px`
  capy.style.width = hovering ? '42px' : '0px'
  capy.style.height = hovering ? '42px' : '0px'
  capy.style.opacity = hovering && !overPlayButton.current ? '1' : '0'
}
        path.style.fill = hovering
          ? sampleGradient(cursor.current.x, cursor.current.y)
          : 'white'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
  <>
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-200px',
        top: '-200px',
        width: '33px',
        height: '33px',
        pointerEvents: 'none',
        zIndex: 9999,
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
      }}
    >
      <path
        ref={pathRef}
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        style={{
          fill: 'white',
          transition: 'fill 0.3s ease',
        }}
      />
    </svg>

    <img
      ref={capyRef}
      src={`${assetPathPrefix}/capyhead.PNG`}
      alt=""
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-200px',
        top: '-200px',
        width: '0px',
        height: '0px',
        objectFit: 'contain',
        pointerEvents: 'none',
        zIndex: 10000,
        opacity: 0,
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
      }}
    />
  </>
)
}

export default function App() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [fixedCardHeight, setFixedCardHeight] = useState<number | undefined>()
  const [biteFailed, setBiteFailed] = useState(false) // true if bitten.PNG fails to load -> keep the normal image on hover

  // Warm up the YouTube IFrame player as soon as the page loads, instead of waiting
  // for the first play click. Without this, the very first song someone plays has to
  // wait for the YouTube API script to download AND the player to initialize before
  // anything happens (often several seconds); every play after that is fast because
  // getSlots() is memoized and just reuses the same players.
  useEffect(() => {
    for (const href of ['https://www.youtube.com', 'https://i.ytimg.com', 'https://s.ytimg.com']) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      document.head.appendChild(link)
    }
    getSlots()
  }, [])

  // One-time cleanup: purge any "flipped"/"seen" localStorage entries for cards that
  // are currently locked. These are leftovers from when isCardUnlocked briefly always
  // returned true (a temp debug stub), which let locked cards get flipped and saved.
  useEffect(() => {
    try {
      const sanitize = (key: string) => {
        const raw = localStorage.getItem(key)
        if (!raw) return
        const arr: number[] = JSON.parse(raw)
        const cleaned = arr.filter((i) => isCardUnlocked(i))
        if (cleaned.length !== arr.length) localStorage.setItem(key, JSON.stringify(cleaned))
      }
      sanitize('flippedCards')
      sanitize('seenCards')
    } catch {}
  }, [])

  // Welcome modal: shown automatically on the very first visit, reopenable anytime by clicking the header image
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return localStorage.getItem(WELCOME_SEEN_KEY) !== 'true'
    } catch { return false }
  })
  function closeWelcome() {
    setShowWelcome(false)
    try { localStorage.setItem(WELCOME_SEEN_KEY, 'true') } catch {}
  }

  // ---- Draggable header image ----
  // Offset is a transform, so it doesn't affect layout of the surrounding flex row;
  // dragging just moves the image visually and it stays wherever you drop it.
  useEffect(() => {
    const measure = () => {
      if (window.innerWidth < 450) {
        setFixedCardHeight(undefined)
        return
      }
      if (!gridRef.current) return
      setFixedCardHeight(undefined)
      requestAnimationFrame(() => {
        if (!gridRef.current) return
        const spacers = gridRef.current.querySelectorAll('[data-spacer]')
        let max = 0
        spacers.forEach(el => { max = Math.max(max, (el as HTMLElement).offsetHeight) })
        if (max > 0) setFixedCardHeight(max)
      })
    }
    // Wait for fonts before initial measurement so Poppins metrics are used
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <>
      {showWelcome && <WelcomeModal onClose={closeWelcome} />}
      <HeartCursor />
      <div
        className="relative min-h-screen w-full overflow-x-hidden pt-[80px] pb-[32px] px-[32px] tablet:px-[40px] desktop:px-[48px] desktop:pb-[48px]"
        style={{
          backgroundImage:
            'linear-gradient(155.997deg, #FFB7CA 0%, #faebc1 100%)',
        }}
      >
      <ShootingStars />
      <div className="relative flex flex-col gap-[40px]" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="flex flex-col-reverse items-start gap-[8px] sm:flex-row sm:items-center">
          <div className="flex flex-col gap-[10px] text-[#3b3b3b] sm:flex-1">
            <p className="text-[75px] leading-[68px] tablet:text-[100px] tablet:leading-[106px]" style={{ fontFamily: "'Angela', cursive" }}>
              happy 6 months!!
            </p>
            <p className="text-[39px] leading-[35px] italic" style={poppinsItalic}>
              a lyric a day keeps the doctor away :p
            </p>
          </div>
          {/* Mobile (<450px): stacked, image ABOVE the title (flex-col-reverse), 120px -> 50vw -> 220px.
              450px+: side by side, 104px min -> scales with viewport (22vw) -> 260px max;
              only shrinks below the min if the title's longest word needs the room.
              Both images are stacked and swapped with CSS on hover, so bitten.PNG is
              already loaded (no flash). If it fails to load, the normal image stays.
              Clicking it reopens the welcome modal; the mouse cursor swaps to capyhead.png
              on hover, matching the unlocked-card hover cursor (see data-capy-cursor / HeartCursor). */}
          <div
            className="group relative aspect-square w-[clamp(120px,50vw,220px)] min-w-0 shrink select-none sm:w-[clamp(104px,22vw,260px)] cursor-pointer"
            data-capy-cursor
            role="button"
            tabIndex={0}
            aria-label="Show welcome message"
            onClick={() => setShowWelcome(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowWelcome(true) }}
          >
            <img
              src={`${assetPathPrefix}/header-icon.png`}
              alt=""
              draggable={false}
              className={`absolute inset-0 h-full w-full object-contain ${biteFailed ? '' : 'group-hover:invisible'}`}
            />
            {!biteFailed && (
              <img
                src={`${assetPathPrefix}/bitten.PNG`}
                alt=""
                draggable={false}
                onError={() => setBiteFailed(true)}
                className="invisible absolute inset-0 h-full w-full object-contain group-hover:visible"
              />
            )}
          </div>
        </div>

        {/* Card grid — 1 col mobile, 3 col tablet, 5 col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-3 lg:grid-cols-4 desktop:grid-cols-5 gap-[28px] lg:gap-[40px]"
        >
          {cards.map((card, i) => (
            <FlipCard key={i} card={card} fixedHeight={fixedCardHeight} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <p className="text-[#3b3b3b] text-[39px] leading-[65px] italic" style={poppinsItalic}>
            {'<3, angela'}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
