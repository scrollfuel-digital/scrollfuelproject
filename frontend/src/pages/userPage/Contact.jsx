import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

/* ------------------ BASIC ANIMATIONS ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};





/* ------------------ HEADING TYPE ANIMATION ------------------ */

const headingText = "Contact Scrollfuel Digital Marketing Agency";

function AnimatedHeading() {
  const words = headingText.split(" ");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [renderedWords, setRenderedWords] = useState([]);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (charIndex < currentWord.length) {
      const t = setTimeout(() => {
        setRenderedWords(prev => {
          const copy = [...prev];
          copy[wordIndex] = (copy[wordIndex] || "") + currentWord[charIndex];
          return copy;
        });
        setCharIndex(c => c + 1);
      }, 70);
      return () => clearTimeout(t);
    }

    if (wordIndex < words.length - 1) {
      const next = setTimeout(() => {
        setWordIndex(w => w + 1);
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(next);
    }

    const reset = setTimeout(() => {
      setRenderedWords([]);
      setWordIndex(0);
      setCharIndex(0);
    }, 1200);

    return () => clearTimeout(reset);
  }, [charIndex, wordIndex]);

  return (
    <h1 className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap gap-2 ">
      {words.map((_, wIdx) => (
        <span key={wIdx} className="flex">
          {(renderedWords[wIdx] || "").split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}



/* ------------------ PAGE ------------------ */

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        // ✅ CLEAR FORM AFTER SUBMIT
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });

      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error");
    }
  };
  return (
    <div className="bg-black text-white">

      {/* ------------------ HERO ------------------ */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-40 grid md:grid-cols-2 gap-12 items-center">

          <motion.img
            src="/assets/illustrations/contact1.png"
            alt="Contact Illustration"
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 6 }} // start below the navbar
            animate={{
              opacity: 1,
              y: [60, 0, 0], // slide up into place, then stay at 0 for float
            }}
            transition={{
              duration: 1,        // slide-up duration
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              // start the floating animation after slide-up
              const floating = document.querySelector("#floatingIllustration");
              if (floating) {
                floating.animate(
                  [
                    { transform: "translateY(0px)" },
                    { transform: "translateY(-20px)" },
                    { transform: "translateY(0px)" }
                  ],
                  {
                    duration: 4000,
                    iterations: Infinity,
                    easing: "ease-in-out"
                  }
                );
              }
            }}
            id="floatingIllustration"
          />



          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <AnimatedHeading />

            <p className="text-muted max-w-xl mb-8 leading-relaxed font-semibold">
              Get in touch with Scrollfuel to discuss your
              digital marketing goals and receive a customized growth strategy.
            </p>

            <a
              href="#contact-form"
              className="inline-block bg-primary text-dark font-bold px-8 py-4 rounded-full shadow-lg
                         hover:scale-105 transition"
            >
              Get Your Free Digital Marketing Consultation
            </a>
          </motion.div>
        </div>
      </section>

      {/* ------------------ QUICK CONTACT ------------------ */}

      <section className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {[
          {
            icon: Phone,
            title: "Call Us",
            value: "+91 8788430110",
            link: "tel:+918788430110",
            from: "left",
          },
          {
            icon: MessageCircle,
            title: "WhatsApp",
            value: "Chat Now",
            link: "https://wa.me/918788430110",
            from: "left",
          },
          {
            icon: Mail,
            title: "Email",
            value: "scrollfuel@gmail.com",
            link: "https://mail.google.com/mail/?view=cm&fs=1&to=scrollfuel@gmail.com",
            from: "right",
          },
          {
            icon: MapPin,
            title: "Office",
            value: "Nagpur, India",
            link: "https://maps.app.goo.gl/oQfiqBwaEo6xyFYYA",
            from: "right",
          },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: item.from === "left" ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-muted/10 rounded-2xl p-6 border border-white/10 shadow-lg hover:bg-secondary/20 transition group"
          >
            <item.icon className="text-primary mb-4 group-hover:scale-110 transition" size={28} />
            <h4 className="font-bold mb-1">{item.title}</h4>
            <p className="font-bold text-muted text-sm">{item.value}</p>
          </motion.a>
        ))}
      </section>

      {/* ------------------ FORM + MAP (UNCHANGED STRUCTURE) ------------------ */}
      <section id="contact-form" className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 transition">
        {/* FORM */}
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="px-8 py-3 rounded-3xl shadow-2xl "
        >
          <h2 className="text-2xl font-bold mb-6 bg-primary text-center rounded-4xl py-1">Get Free Consultation</h2>

          <div className="space-y-4 ">
            <input className="w-full  p-3 rounded-lg shadow-xl  border border-gray-800" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <input className="w-full  p-3 rounded-lg shadow-xl  border border-gray-800" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input className="w-full  p-3 rounded-lg shadow-xl  border border-gray-800" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
            <select
              className="w-full border border-gray-800 p-3 rounded-lg"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Service Interested In</option>

              <option value="Social Media Marketing & Management" className="text-gray-900">
                Social Media Marketing & Management
              </option>

              <option value="Web Design & Development" className="text-gray-900">
                Web Design & Development
              </option>

              <option value="Lead Generation" className="text-gray-900">
                Lead Generation
              </option>

              <option value="Content Creation" className="text-gray-900">
                Content Creation
              </option>

              <option value="Advertising & Marketing" className="text-gray-900">
                Advertising & Marketing
              </option>

              <option value="Branding & Graphic Designing" className="text-gray-900">
                Branding & Graphic Designing
              </option>

              <option value="Google Ads & PPC Campaign" className="text-gray-900">
                Google Ads & PPC Campaign
              </option>

              <option value="Others" className="text-gray-900">
                Others
              </option>
            </select>

            <textarea className="w-full p-3 rounded-lg shadow-xl border border-gray-800" name="message" rows="4" placeholder="Your Message" value={form.message} onChange={handleChange} />
          </div>

          <button className="mt-6 bg-primary text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition " type="submit">
            Submit
          </button>
        </motion.form>

        {/* MAP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          <iframe
            title="Scrollfuel Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3722.4299900309484!2d79.0640556!3d21.0954167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA1JzQzLjUiTiA3OcKwMDMnNTAuNiJF!5e0!3m2!1sen!2sin!4v1769861063448!5m2!1sen!2sin"
            className="w-full h-full min-h-100"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </motion.div>
      </section>
    </div>
  );
}
