import { X } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageBubble = ({ role, content, images }) => {
  const isUser = role === "user";
  const [lightBox, setLightBox] = useState(null);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] wrap-break-word overflow-hidden leading-relaxed ${
          isUser
            ? "bg-linear-to-br from-indigo-500 to-viole-700 text-white rounded-tr-sm"
            : " text-slate-200 rounded-tl-sm"
        } `}
      >
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-28 rounded-xl object-cover border-white/10 cursor-zoom-in hover:opacity-90 transition"
                onClick={() => setLightBox(image)}
              />
            ))}
          </div>
        )}

        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mt-5 mb-3">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mt-3 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-3 whitespace-pre-wrap wrap-break-word">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border border-white/10">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-white/10 bg-white/5 px-3 py-2 text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-white/10  px-3 py-2 text-left">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
      {lightBox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2 cursor-pointer"
            onClick={() => setLightBox(null)}
          >
            <X />
          </button>
          <img
            className="max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain "
            src={lightBox}
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
