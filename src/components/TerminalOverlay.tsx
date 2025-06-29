interface TerminalOverlayProps {
  workoutItems: string[];
  status?: string;
  sessionId?: string;
}

const TerminalOverlay = ({
  workoutItems = [],
  status = "WORKOUT ANALYSIS COMPLETE",
  sessionId = "78412.93",
}: TerminalOverlayProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-4 sm:pb-6">
      <div className="relative bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded-lg p-3 overflow-hidden font-mono">
        {/* Status bar */}
        <div className="flex items-center justify-between mb-2 border-b border-border pb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-xs text-primary">SYSTEM ACTIVE</p>
          </div>
          <p className="text-xs text-muted-foreground">ID: {sessionId}</p>
        </div>

        <p className="text-sm text-foreground mb-2 tracking-tight">
          <span className="text-primary">/</span> {status}
        </p>

        <div className="space-y-1.5 text-xs text-muted-foreground">
          {workoutItems.map((item, index) => (
            <div className="flex items-center" key={index}>
              <div className="text-primary mr-2">
                {String(index + 1).padStart(2, "0")}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalOverlay;
