import { Code, PanelRightClose, PanelRightOpen } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { easeInOut, motion } from "motion/react"

const Artifact = () => {
  const { artifacts } = useSelector((state) => state.message)
  const [collapsed, setCollapsed] = useState(false)


  // if (collapsed) {
  //   return (
  //     <motion.div
  //       initial={{}}
  //       animate={{}}
  //       transition={{}}

  //     >


  //     </motion.div>
  //   )
  // }

  if (artifacts?.length == 0) return

  return (
    <motion.div
      initial={{ width: 250 }}
      animate={{ width: collapsed ? 48 : 250 }}
      transition={{
        duration: 0.25,
        ease: easeInOut
      }}
      className='hidden lg:flex h-full border-l ☐ border-white/6 flex-col overflow-hidden shrink-0 w-[250px]'
      >
      {!collapsed
        ?
        (<div className='flex flex-col h-full bg-[#0d0f14]'>
          <div className='h-14 px-4 border-b border-white/5 flex items-center gap-3 shrink-0'>
            <button
              onClick={() => setCollapsed(true)}
              className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200
           hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
              <PanelRightClose size={16} />
            </button>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <div className='flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0'>
                <Code size={16} />
              </div>
              <div className='text-[13px] font-medium text-slate-200 truncate'>
                {artifacts[0]?.title}
              </div>

            </div>
          </div>
        </div>)
        :
        (
          <div className='hidden lg:flex h-full border-l border-white/6 bg-[#0d0f14] flex-col items-center py-4 gap-3 shrink-0'>
            <button
              onClick={() => setCollapsed(false)}
              className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200
           hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
              <PanelRightOpen size={16} />
            </button>
            <div className='flex items-center gap-2 flex-1 min-w-0'>
              <div className='text-[10px] font-medium text-slate-600 truncate-widest uppercase whitespace-nowrap '
                style={{
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180)'
                }}
              >
                {artifacts[0]?.title}
              </div>

            </div>

          </div>
        )
      }
    </motion.div>
  )
}

export default Artifact