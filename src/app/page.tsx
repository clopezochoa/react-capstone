import 'styles/landing.css'
import { lalezar, maitree } from 'app/lib/fonts'

export default function Home() {
  return (
    <>
      <div className="landing bg-white">
        <div className={lalezar.className}>
          <h1>
            Your Health
          </h1>
          <h2>
            Our Responsibility
          </h2>
        </div>
        <div className="message-container">
          <p className={maitree.className}>
          “Our health is more than just the absence of disease; it&apos;s a state of physical, mental, and emotional well-being. Embracing self-awareness, or the ability to understand and accept one&apos;s own thoughts, feelings, and behaviors, is crucial for maintaining and enhancing our overall health.” 
          </p>
          <div>
            <button className="btn start-button text-white bg-main mt-12">Get Started</button>
          </div>
        </div>
      </div>
  </>
  )
}
