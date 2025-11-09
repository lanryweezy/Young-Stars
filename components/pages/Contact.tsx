import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import LocationIcon from '../icons/LocationIcon';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';

const Contact: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
    };

    const contactDetails = [
        {
            icon: <LocationIcon />,
            title: 'Our Address',
            value: 'Zone 5, Road 8 Olorunsogo Street, Ado Ekiti 360102, Ekiti',
            href: 'https://www.google.com/maps/place/YOUNG+STARS+INTERNATIONAL+SCHOOL/@7.9474721,5.2774375,17z/data=!4m6!3m5!1s0x104787a240398647:0x8e83b137b51b7389!8m2!3d7.9474721!4d5.2800124!16s%2Fg%2F11h85kyj6k',
        },
        {
            icon: <PhoneIcon />,
            title: 'Call Us',
            value: '+234 806 373 1163',
            href: 'tel:+2348063731163',
        },
        {
            icon: <WhatsAppIcon />,
            title: 'WhatsApp',
            value: '+234 806 373 1163',
            href: 'https://wa.me/2348063731163',
        },
        {
            icon: <EmailIcon />,
            title: 'Email Us',
            value: 'info@youngstars.ng',
            href: 'mailto:info@youngstars.ng',
        }
    ];

  return (
    <div className="animate-fade-in-up pt-24 pb-16 bg-space-light/95">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Contact <span className="text-brand-green">Us</span></h1>
          <p className="mt-4 text-lg text-brand-cream-dark max-w-3xl mx-auto">We're here to answer your questions. Let's connect.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <div className="space-y-6">
                        {contactDetails.map((detail, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 text-brand-green mt-1">{detail.icon}</div>
                                <div>
                                    <h3 className="font-orbitron text-lg font-bold text-white">{detail.title}</h3>
                                    <a href={detail.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-green transition-colors duration-300 break-words">
                                        {detail.value}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="rounded-2xl overflow-hidden h-96 bg-space-light border-2 border-brand-green/20">
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4939055816913!2d5.277437474779601!3d7.947472092072973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104787a240398647%3A0x8e83b137b51b7389!2sYOUNG%20STARS%20INTERNATIONAL%20SCHOOL!5e0!3m2!1sen!2sng"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="School Location"
                    ></iframe>
                </div>
            </div>
            
            <div className="lg:col-span-3">
                 <Card className="p-8">
                    <h3 className="font-orbitron text-2xl font-bold text-white mb-6">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                                <input type="text" id="name" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <input type="email" id="email" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                            <input type="text" id="subject" required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea id="message" rows={5} required className="w-full bg-space-light border border-brand-green/30 rounded-xl py-2.5 px-4 text-white focus:ring-brand-green focus:border-brand-green transition"></textarea>
                        </div>
                        <div>
                            <Button type="submit" className="w-full md:w-auto" size="lg">Send Message</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;