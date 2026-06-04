import React, { Component } from "react";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      messages: [],
      showFAQ: true,
    };
  }

  componentDidMount() {
    this.initChat();
  }

  componentDidUpdate(prevProps) {
    // si cambia el idioma, reinicia el chat
    if (prevProps.chatData !== this.props.chatData) {
      this.initChat();
    }
    if (this.messagesEndRef) {
      this.messagesEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }

  initChat() {
    const chatData = this.props.chatData || {};
    const welcome = chatData.welcome || "Hi! I'm your assistant. How can I help you?";
    this.setState({
      messages: [{ from: "bot", text: welcome }],
      showFAQ: true,
    });
  }

  toggleChat() {
    this.setState((prev) => ({ isOpen: !prev.isOpen }));
  }

  handleFAQ(faq) {
    this.setState((prev) => ({
      messages: [
        ...prev.messages,
        { from: "user", text: faq.question },
        { from: "bot", text: faq.answer },
      ],
      showFAQ: false,
    }));
  }

  resetChat() {
    this.initChat();
  }

  render() {
    const { isOpen, messages, showFAQ } = this.state;
    const chatData = this.props.chatData || {};
    const faqs = chatData.faq || [];
    const backLabel = chatData.back || "← Back";

    return (
      <div style={{ position: "fixed", bottom: "30px", left: "30px", zIndex: 9999 }}>

        {isOpen && (
          <div style={{
            width: "320px",
            height: "450px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
            overflow: "hidden",
          }}>

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
                }}>
                  <span role="img" aria-label="robot">🤖</span>
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}>
                    Arturo's Assistant
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}>
                    ● Online
                  </div>
                </div>
              </div>
              <span
                onClick={() => this.toggleChat()}
                style={{ color: "#fff", cursor: "pointer", fontSize: "18px" }}
                aria-label="close"
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
                    borderRadius: msg.from === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                    background: msg.from === "user" ? "#AE944F" : "#fff",
                    color: msg.from === "user" ? "#fff" : "#333",
                    fontSize: "13px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {showFAQ && faqs.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                  {faqs.map((faq, i) => (
                    <button
                      key={i}
                      onClick={() => this.handleFAQ(faq)}
                      style={{
                        background: "#fff",
                        border: "1px solid #AE944F",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        fontSize: "12px",
                        color: "#AE944F",
                        cursor: "pointer",
                        textAlign: "left",
                        fontWeight: "500",
                      }}
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              )}

              {!showFAQ && (
                <button
                  onClick={() => this.resetChat()}
                  style={{
                    background: "transparent",
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "#888",
                    cursor: "pointer",
                    marginTop: "4px",
                    alignSelf: "center",
                  }}
                >
                  {backLabel}
                </button>
              )}

              <div ref={(el) => { this.messagesEndRef = el; }} />
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
          {isOpen
            ? <span aria-label="close">✕</span>
            : <span role="img" aria-label="chat">💬</span>
          }
        </button>
      </div>
    );
  }
}

export default Chat;