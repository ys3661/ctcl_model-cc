import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calculator, BookOpen, Pill, InfoIcon, User, ArrowRight, Sparkles, Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight pb-2">
            CTCL Insight
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
            A clinical decision support tool powered by machine learning to help dermatologists identify patients at
            risk for
            <span className="font-semibold text-blue-700"> cutaneous T-cell lymphoma</span>.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-12">
            <Link href="/calculator" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Risk Calculator</h2>
                  <p className="text-gray-600 mb-4">ML-powered assessment based on clinical features</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    Start Assessment{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/information" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <InfoIcon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Information</h2>
                  <p className="text-gray-600 mb-4">Learn about CTCL types and presentations</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/treatments" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Pill className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Treatments</h2>
                  <p className="text-gray-600 mb-4">Overview of CTCL treatment approaches</p>
                  <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                    View Options <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/resources" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Resources</h2>
                  <p className="text-gray-600 mb-4">Guidelines, research, and referral networks</p>
                  <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700">
                    Browse Resources{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">About</h2>
                  <p className="text-gray-600 mb-4">Learn about this tool and its development</p>
                  <div className="flex items-center text-gray-600 font-medium group-hover:text-gray-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/feedback" className="group">
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900">Contact Us</h2>
                  <p className="text-gray-600 mb-4">Get in touch for support or suggestions</p>
                  <div className="flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                    <a href="mailto:ctclriskcalculator@gmail.com" className="hover:text-indigo-700 transition-colors">
                      ctclriskcalculator@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-blue-100 mb-6 text-lg">
              Begin your CTCL risk assessment with our ML-powered calculator.
            </p>
            <Link href="/calculator">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
