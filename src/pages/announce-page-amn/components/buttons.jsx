

export default function Button({type, source, text, action}) {
    return (
      <button type="submit" className={`note-btn ${type}`} onClick={action}>
        <span className="text">{text}</span>
        <span className={`icon ${type}`}>
          <img src={source}/>
        </span>
      </button>
    );
  }