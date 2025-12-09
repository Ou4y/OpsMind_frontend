import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewTicket() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);

  // ==== Handle File Upload ====
  function handleFileUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result as string);
    };
    reader.readAsDataURL(file); // convert to base64
  }

  // ==== Save Ticket ====
  function handleSubmit() {
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

    const saved = JSON.parse(localStorage.getItem("tickets") || "[]");
    saved.unshift(ticket);
    localStorage.setItem("tickets", JSON.stringify(saved));

    navigate("/student/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">New Support Ticket</h1>

        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6 border">
        {/* Title */}
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full mt-1 border rounded-lg p-3 text-sm"
            placeholder="Enter a brief summary"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            className="w-full mt-1 border rounded-lg p-3 text-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select a category</option>
            <option>Account</option>
            <option>Technical</option>
            <option>Network</option>
            <option>Hardware</option>
            <option>Software</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full mt-1 border rounded-lg p-3 text-sm h-32 resize-none"
            placeholder="Describe your issue..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Attachment Upload */}
        <div>
          <label className="text-sm font-medium">Attachments</label>

          <label className="mt-3 border border-slate-300 rounded-xl p-6 bg-slate-50 text-center block cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />

            <div className="text-3xl text-slate-500 mb-2">📁</div>
            <p className="text-blue-600 text-sm font-medium">Tap to upload files</p>
            <p className="text-xs text-gray-400 mt-1">Max file: 10MB</p>
          </label>

          {attachment && (
            <img
              src={attachment}
              alt="preview"
              className="mt-3 h-32 rounded-lg border object-cover"
            />
          )}
        </div>
      </div>

      <button
        className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow hover:bg-blue-700 transition w-full"
        onClick={handleSubmit}
      >
        Submit Ticket
      </button>
    </div>
  );
}
