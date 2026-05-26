import { Shield, X } from 'lucide-react';

interface TwoFactorModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function TwoFactorModal({ onClose, onSuccess }: TwoFactorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden animate-price">
        
        <div className="flex items-center justify-between p-5 border-b border-border bg-surface-highlight">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-text-main">Enable Two-Factor Auth</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-text-secondary hover:text-error transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-white border-2 border-border mx-auto flex items-center justify-center rounded-lg mb-4 shadow-sm">
              <span className="text-xs text-gray-400">QR Code Mockup</span>
            </div>
            <p className="text-sm text-text-secondary">
              Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy).
            </p>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-main">Enter 6-digit code</label>
            <input 
              type="text" 
              placeholder="000000" 
              maxLength={6}
              className="input-base input-default text-center text-xl tracking-widest font-mono"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-lg border border-border bg-surface hover:bg-surface-highlight text-text-main font-semibold transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="flex-1 py-2.5 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-md"
            >
              Verify
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
