export const getPiPStyles = (accountColor: string = "#667eea") => `
  body {
    margin: 0;
    padding: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: transparent;
    /* backdrop-filter: blur(16px); */
    /* border: 1px solid rgba(255, 255, 255, 0.2); */
    /* border-radius: 24px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: auto;
    overflow: hidden;
    box-sizing: border-box;
    /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); */
  }
  
  .pip-timer {
    color: ${accountColor};
    font-size: 48px;
    font-weight: 300;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    letter-spacing: -0.05em;
    line-height: 1;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    drop-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .pip-account {
    color: rgba(107, 114, 128, 0.8);
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 2px;
  }
  
  .pip-status {
    color: rgba(107, 114, 128, 0.6);
    font-size: 9px;
    font-weight: 400;
    margin-top: 4px;
  }
  
  .pip-container {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
`;
