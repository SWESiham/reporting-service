import React from 'react'

interface KPIs{
    title: string;
    value: string | number;
    subtitle?: React.ReactNode;
    color: string;
}
// Destructuring
export const KPI: React.FC<KPIs> = ({
    title, value, subtitle, color = "#006aff"
}) => {
    return (
        <div
            style =
            {{
                background: "#12161f",
                border: "1px solid #1e2535",
                borderRadius: 12,
                padding: "20px 22px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s",
                cursor: "default",
            }}

        onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e2535")}
        
        >
            <div
                style=
                {{
                display:"flex" , justifyContent:"space-between" , alignItems:"flex-start",marginBottom:14
                }}>
                
                <p
                    style=
                    {{
                        fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b" 
                        
                    }}>
                    {title}
                </p>

            </div>
            
            <div
                style=
                {{
                    fontSize: 34, fontWeight: 700, color: "#f1f5f9", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em", lineHeight: 1
                }}>
                {value}
            </div>
        
            <div
                style=
                {{
                    marginTop: 10, display: "flex", alignItems: "center", gap: 8 , fontSize: 15, color: "#475569"
                }}>
                {subtitle}
            </div>

            <div
                style=
                {{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: 3, background: `linear-gradient(90deg, ${color}, ${color}, transparent)`,
                }}
            />
        
        </div>
        
    )
    
}