export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for our blog.',
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: August 1, 2026
      </p>

      <div className="prose prose-neutral mt-8 dark:prose-invert">
        <p>
          Thank you for visiting our blog. Your privacy is important to us. This privacy policy 
          explains what information we collect and how we use it when you visit our website.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p>
          When you visit our blog, we may collect the following information:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Usage Data:</strong> Like your IP address, browser type, and the pages you visit, 
          collected through Google Analytics to help us understand how to improve our content.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and to 
          serve relevant advertisements.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements on our site. Google uses cookies to serve 
          ads based on your visit to this site and other websites. You can opt out of 
          personalized advertising by visiting{' '}
          <a 
            href="https://policies.google.com/technologies/ads" 
            className="text-blue-600 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Google Ad & Privacy Policy
          </a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p>
          The information we collect is used solely to improve your user experience and to analyze 
          our site's performance. We do not sell your personal information to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please feel free to contact us at 
          <strong> dhanapaul2020@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
}