import { AlertTriangle, X } from "lucide-react";

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-price">
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-highlight">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-text-main">Delete Account</h3>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-red-500 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to delete your account? This action cannot be
            undone. All your data will be permanently removed from our servers.
          </p>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-lg border border-border bg-surface hover:bg-surface-highlight text-text-main font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
            >
              Yes, Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
