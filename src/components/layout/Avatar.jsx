
const Avatar = ({ src, alt = "img", size = "2", grey }) => {
  return (
    <div style={{ width: `${size}rem`, height: `${size}rem` }} className={`rounded-full overflow-hidden border-2 border-gray-300`}>
      <img src={src} alt={alt} className={`w-full h-full object-cover ${!grey ? "" : "filter grayscale"
        }`} />
    </div>
  );
};

export default Avatar;
