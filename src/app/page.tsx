import 'styles/landing.css'
import fonts from 'app/lib/fonts'

export default function Home() {
  return (
    <>
      <div className="landing bg-white">
        <div className={fonts[1].className}>
          <h1>
            Your Health
          </h1>
          <h2>
            Our Responsibility
          </h2>
        </div>
        <div className="message-container">
          <p className={fonts[2].className}>
          “Our health is more than just the absence of disease; it&apos;s a state of physical, mental, and emotional well-being. Embracing self-awareness, or the ability to understand and accept one&apos;s own thoughts, feelings, and behaviors, is crucial for maintaining and enhancing our overall health.” 
          </p>
          <div className={fonts[0].className}>
            <button className="btn start-button text-white bg-main mt-12">Get Started</button>
          </div>
        </div>
      </div>
  </>
  )
}
