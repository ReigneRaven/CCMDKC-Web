

export default function Button({type, source, text, action, id}) {
    return (
      <button type="submit" className={`note-btn ${type}`} onClick={action} id={id}> 
        <span className="text">{text}</span>
        <span className={`icon ${type}`}>
          <img src={source}/>
        </span>
      </button>
    );
  }