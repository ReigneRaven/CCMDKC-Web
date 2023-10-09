import '../patientrecord.css'

export default function Input({type, value, placeholder, onChange }) {

  return (
    <div className="stocks-input">
      <div className="margin"></div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={true}
      />
 
    </div>
  );
}