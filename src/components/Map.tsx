const Map = () => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden glass-card">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126758.23254063976!2d39.14307394726562!3d-6.82349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c73fa3b5c1f%3A0x1b2b2b2b2b2b2b2b!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1641234567890!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  );
};

export default Map;