export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Contact Me</h1>
      
      <p className="mb-4">உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால் அல்லது இணைந்து பணியாற்ற விரும்பினால், என்னை இங்கே தொடர்பு கொள்ளலாம்:</p>
      <a href="mailto:dhanapaul2020@gmail.com" className="mb-8 block text-blue-600 underline">
        dhanapaul2020@gmail.com
      </a>

      <div className="mt-8 border-t border-border pt-8">
        <h2 className="mb-4 text-xl font-semibold">Visit R I Billing Pro</h2>
        <p className="mb-4">எங்கள் சேவைகள் மற்றும் வாடிக்கையாளர் மதிப்புரைகளைக் காண கீழே உள்ள லிங்க்-ஐப் பயன்படுத்தவும்:</p>
        
        {/* உங்கள் Google Business Profile லிங்க்-ஐ இங்கே கொடுக்கவும் */}
        <a 
          href="https://www.google.com/maps/place/R+I+Billing+Pro/@10.8243977,78.6725869,17z/data=!3m1!4b1!4m6!3m5!1s0x3baaf5a14e143f43:0xabdb33e09e8c4c61!8m2!3d10.8243977!4d78.6725869!16s%2Fg%2F11zh639kjk?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/85"
        >
          View R I Billing Pro on Google
        </a>
      </div>
    </div>
  );
}