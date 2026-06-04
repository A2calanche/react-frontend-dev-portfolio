import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      messages: [
        {
          from: "bot",
          text: "Hi! I'm Arturo's assistant. How can I help you today? 👋",
        },
      ],
      inputValue: "",
    };
    this.messagesEndRef = React.createRef();
  }

  toggleChat() {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  }

  handleInput(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") this.sendMessage();
  }

  sendMessage() {
    const text = this.state.inputValue.trim();
    if (!text) return;

    this.setState((prev) => ({
      messages: [...prev.messages, { from: "user", text }],
      inputValue: "",
    }));

    setTimeout(() => {
      this.setState((prev) => ({
        messages: [
          ...prev.messages,
          {
            from: "bot",
            text: "Thanks for your message! I'll connect you with Arturo shortly.",
          },
        ],
      }));
    }, 800);
  }

  componentDidUpdate() {
    if (this.messagesEndRef.current) {
      this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { isOpen, messages, inputValue } = this.state;

    return (
      <div style={{ position: "fixed", bottom: "30px", left: "30px", zIndex: 9999 }}>

        {isOpen && (
          <div style={{
            width: "320px",
            height: "420px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
            overflow: "hidden",
          }}>

            {/* HEADER */}
            <div style={{
              background: "#AE944F",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px"
                }}> <span role="img" aria-label="robot">🤖</span>
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}>Arturo's Assistant</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>● Online</div>
                </div>
              </div>
              <span
                onClick={() => this.toggleChat()}
                style={{ color: "#fff", cursor: "pointer", fontSize: "18px" }}
              >✕</span>
            </div>

            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#f8f8f8",
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "75%",
                    padding: "10px 14px",
                    borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.from === "user" ? "#AE944F" : "#fff",
                    color: msg.from === "user" ? "#fff" : "#333",
                    fontSize: "13px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={this.messagesEndRef} />
            </div>

            <div style={{
              padding: "10px 12px",
              borderTop: "1px solid #eee",
              display: "flex",
              gap: "8px",
              background: "#fff",
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => this.handleInput(e)}
                onKeyDown={(e) => this.handleKeyDown(e)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => this.sendMessage()}
                style={{
                  background: "#AE944F",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >➤</button>
            </div>
          </div>
        )}

        <button
          onClick={() => this.toggleChat()}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#AE944F",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            fontSize: "24px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? <span aria-label="close"> ✕ </span> : <span role="img" aria-label="chat">💬</span>}
        </button>
      </div>
    );
  }
}

export default Chat;