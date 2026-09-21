import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The state portal directory or route you were looking for doesn't exist or has moved.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Tamil Nadu One Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
