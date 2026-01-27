import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { PageHeader } from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import clsx from "clsx";

// Category options with icons
const categories = [
  { value: "", label: "Select a category", icon: "" },
  { value: "Account", label: "Account", icon: "👤" },
  { value: "Network", label: "Network", icon: "🌐" },
  { value: "Hardware", label: "Hardware", icon: "💻" },
  { value: "Software", label: "Software", icon: "📦" },
  { value: "Technical", label: "Technical", icon: "🔧" },
];

// Input wrapper component for consistent styling
function FormField({
  label,
  required = false,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle File Upload
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Remove attachment
  function removeAttachment() {
    setAttachment(null);
    setFileName(null);
  }

  // Save Ticket
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!title || !category || !description) {
      return;
    }

    setIsSubmitting(true);

    const ticket = {
      id: "T-" + Math.floor(Math.random() * 90000 + 10000),
      title,
      category,
      description,
      status: "OPEN",
      due: "Just now",
      createdAt: new Date().toLocaleString(),
      attachment,
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const saved = JSON.parse(localStorage.getItem("tickets") || "[]");
    saved.unshift(ticket);
    localStorage.setItem("tickets", JSON.stringify(saved));

    navigate("/student/dashboard");
  }

  const inputStyles = clsx(
    "w-full px-4 py-3 rounded-xl text-sm",
    "bg-white border border-slate-200",
    "text-slate-900 placeholder:text-slate-400",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Create New Ticket"
        subtitle="Fill out the form below to submit a support request"
        actions={
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        }
      />

      <form onSubmit={handleSubmit}>
        <Card className="space-y-6">
          {/* Title */}
          <FormField label="Title" required>
            <input
              type="text"
              className={inputStyles}
              placeholder="Enter a brief summary of your issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormField>

          {/* Category */}
          <FormField label="Category" required>
            <select
              className={inputStyles}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </FormField>

          {/* Description */}
          <FormField
            label="Description"
            required
            hint="Please provide as much detail as possible to help us resolve your issue faster."
          >
            <textarea
              className={clsx(inputStyles, "min-h-[150px] resize-y")}
              placeholder="Describe your issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormField>

          {/* Attachment Upload */}
          <FormField label="Attachments" hint="Max file size: 10MB. Supported formats: Images, PDF, DOC">
            {!attachment ? (
              <label
                className={clsx(
                  "flex flex-col items-center justify-center",
                  "border-2 border-dashed border-slate-200 rounded-xl",
                  "p-8 bg-slate-50/50 cursor-pointer",
                  "hover:border-primary/50 hover:bg-slate-50 transition-all duration-200"
                )}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF up to 10MB</p>
              </label>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                {attachment.startsWith("data:image") ? (
                  <img
                    src={attachment}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{fileName}</p>
                  <p className="text-xs text-slate-500">Ready to upload</p>
                </div>
                <button
                  type="button"
                  onClick={removeAttachment}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  aria-label="Remove attachment"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </FormField>
        </Card>

        {/* Submit Button */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !title || !category || !description}
            className="flex-1 sm:flex-none sm:min-w-[200px]"
            leftIcon={
              isSubmitting ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </div>
      </form>
    </div>
  );
}
