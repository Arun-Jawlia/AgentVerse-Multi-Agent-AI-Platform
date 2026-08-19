import {
  Check,
  Code,
  Code2,
  Copy,
  Eye,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { easeInOut, motion } from "motion/react";
import Editor from "@monaco-editor/react";

const Artifact = () => {
  const { artifacts } = useSelector((state) => state.message);
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState("code");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  const file = artifacts[0]?.files[activeFile];
  const htmlFile = artifacts[0]?.files?.find((f) => f.name == "index.html");
  const cssFile = artifacts[0]?.files?.find((f) => f.name == "style.css");
  const jsFile = artifacts[0]?.files?.find((f) => f.name == "script.js");

  const canPreview = Boolean(htmlFile);


  const detectLanguage = (filename) => {
    const extensionMap = {
      ".js": "javascript",
      ".jsx": "javascript",
      ".ts": "typescript",
      ".tsx": "typescript",
      ".py": "python",
      ".java": "java",
      ".cpp": "cpp",
      ".c": "c",
      ".cs": "csharp",
      ".go": "go",
      ".rs": "rust",
      ".php": "php",
      ".rb": "ruby",
      ".swift": "swift",
      ".kt": "kotlin",
      ".dart": "dart",
      ".sql": "sql",
      ".html": "html",
      ".css": "css",
      ".scss": "scss",
      ".vue": "vue",
      ".svelte": "svelte",
      ".json": "json",
      ".yaml": "yaml",
      ".yml": "yaml",
      ".md": "markdown",
      ".sh": "shell",
    };

    const extension = "." + filename?.split(".").pop().toLowerCase();

    return extensionMap[extension] || "text";
  };

  const previewDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        ${cssFile?.content || ""}
    </style>
</head>
<body>
${htmlFile?.content || ""}

<script>
${jsFile?.content || ""}
</script>    
</body>
</html>`;


  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(file?.content || "");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (artifacts?.length == 0) return;

  return (
    <motion.div
      initial={{ width: 400 }}
      animate={{ width: collapsed ? 48 : 400 }}
      transition={{
        duration: 0.25,
        ease: easeInOut,
      }}
      className="hidden lg:flex h-full border-l ☐ border-white/6 flex-col overflow-hidden shrink-0 w-[250px]"
    >
      {!collapsed ? (
        <div className="flex flex-col h-full bg-[#0d0f14]">
          <div className="h-14 px-4 border-b border-white/5 flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCollapsed(true)}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200
           hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0"
            >
              <PanelRightClose size={16} />
            </button>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                <Code size={16} />
              </div>
              <div className="text-[13px] font-medium text-slate-200 truncate">
                {artifacts[0]?.title}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
              onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-lg text-slate-400 hover:text-slate-200
           hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer"
              >
               {copied ? <Check size={15}/> : <Copy size={15} />}
              </button>
            </div>

            {canPreview && (
              <div className="flex items-center gap-1 bg-white/4 border border-white/6 rounded-lg">
                <button
                  onClick={() => setTab("code")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors duration-150 cursor-pointer ${tab == "code" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-shadow-lime-200"}`}
                >
                  <Code2 size={11} /> Code
                </button>
                <button
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors duration-150 cursor-pointer ${tab == "preview" ? "bg-indigo-500 text-white" : "text-slate-500 hover:text-shadow-lime-200"}`}
                >
                  <Eye size={11} /> Preview
                </button>
              </div>
            )}
          </div>
          {tab == "code" && (
            <div className="flex h-auto border-b border-white/6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden shrink-0">
              {artifacts[0]?.files?.map((files, i) => (
                <button
                  onClick={() => setActiveFile(i)}
                  className={` px-4 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors duration-150 border-r border-white/5 relative cursor-pointer bg-transparent ${activeFile == i ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  {files?.name}
                  {activeFile == i && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {tab == "preview" && canPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <iframe
                  title="preview"
                  srcDoc={previewDoc}
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Editor
                  theme="vs-dark"
                  language={detectLanguage(file?.name)}
                  value={file.content}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                    lineNumbers: "on",
                    renderLineHighlight: "none",
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex h-full border-l border-white/6 bg-[#0d0f14] flex-col items-center py-4 gap-3 shrink-0">
          <button
            onClick={() => setCollapsed(false)}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-200
           hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0"
          >
            <PanelRightOpen size={16} />
          </button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="text-[10px] font-medium text-slate-600 truncate-widest uppercase whitespace-nowrap "
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(180)",
              }}
            >
              {artifacts[0]?.title}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Artifact;
