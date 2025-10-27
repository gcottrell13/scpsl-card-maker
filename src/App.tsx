import './App.css';
import {Icon, type IconProps} from "./Icon.tsx";
import {useEffect, useRef, useState} from "react";


const PERMISSION_VALUES = [0, 1, 2, 3] as const;
type LEVELS = typeof PERMISSION_VALUES[number];

const default_bottom_text = `There are two devices that function similar to Keycards found in game. Those are the Chaos Insurgency Device and Surface Access Pass.
                The Chaos Insurgency Device has the same exact permissions as a Captain Keycard but has the added function of being able to play Snake by inspecting the device.
                The Surface Access Pass is a unique item that can only be used to open Gate-A and Gate-B but not close them. The item is discarded once used to open a gate.
                Unlike Keycards, throwing either devices at a Keycard Reader will not activate it.`;


const App = () => {
    const [detail_color, set_detail_color] = useState("#c1b5ca");
    const [card_color, set_card_color] = useState("#715D85");
    const [text_color, set_text_color] = useState("black");
    const [background_color, set_background_color] = useState("#daddda");

    const [util_level, set_util_level] = useState<LEVELS>(0);
    const [scp_level, set_scp_level] = useState<LEVELS>(0);
    const [weapon_level, set_weapon_level] = useState<LEVELS>(0);

    const [card_title, set_card_title] = useState("JANITOR");
    const [card_holder, set_card_holder] = useState("Mr. Janitor");
    const [bottom_text, set_bottom_text] = useState(default_bottom_text);

    return (
        <div className="content" style={{
            '--detail-color': detail_color,
            '--card-color': card_color,
            '--text-color': text_color,
            '--background-color': background_color,
            '--wavy-color': '#cfcfcf',
        } as React.CSSProperties}>
            <div className={'card'} style={{backgroundColor: 'var(--background-color)'}}>
                <CardWavyBg />
                <CardSiteAccessBG num_lines={7} font_size={11} text={card_title}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                    alignItems: 'center',
                    bottom: '1%',
                    position: 'absolute',
                }}>
                    <PermissionRow icon={'util'} level={util_level}/>
                    <PermissionRow icon={'weapon'} level={weapon_level}/>
                    <PermissionRow icon={'scp'} level={scp_level}/>
                </div>
                <CardHolder name={card_holder} bottom_text={bottom_text}/>
            </div>
            <hr/>
            <form style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'start'}}>
                <InputText value={card_title} onChange={set_card_title} name={'card title'}/>
                <InputText value={card_holder} onChange={set_card_holder} name={'card holder'}/>

                <SelectColor value={text_color} onChange={set_text_color} name={'text'}/>
                <SelectColor value={detail_color} onChange={set_detail_color} name={'detail'}/>
                <SelectColor value={card_color} onChange={set_card_color} name={'card'}/>
                <SelectColor value={background_color} onChange={set_background_color} name={'background'}/>

                <SelectLevel value={util_level} onChange={set_util_level} icon={'util'}/>
                <SelectLevel value={scp_level} onChange={set_scp_level} icon={'scp'}/>
                <SelectLevel value={weapon_level} onChange={set_weapon_level} icon={'weapon'}/>

                <InputText value={bottom_text} onChange={set_bottom_text} name={'bottom text'} multiline/>
            </form>
        </div>
    );
};

export default App;


interface PermissionRowProps {
    icon: IconProps['name'];
    level: LEVELS;
}

export function PermissionRow({icon, level}: PermissionRowProps) {
    const boxes = [];

    for (let i = 0; i < PERMISSION_VALUES.length; i++) {
        if (PERMISSION_VALUES[i] === 0)
            continue;
        if (level >= PERMISSION_VALUES[i]) {
            boxes.push(
                <span className={'box'} style={{borderColor: 'var(--text-color)'}} key={i}>
                    <svg
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 200 200"
                        width="fill"
                        height="fill"
                        style={{padding: '3px', width: '2.7em', height: '2.7em'}}
                    >
                      <circle cx="100" cy="100" r="90" fill={'var(--text-color)'}/>
                    </svg>
                </span>
            );
        } else {
            boxes.push(<span key={i} className={'box'} style={{borderColor: 'var(--text-color)'}}></span>);
        }
    }

    return (
        <div className={"perm-row"}>
            <Icon name={icon} size={50}/>
            {boxes}
        </div>
    )
}

function SelectLevel({value, icon, onChange}: {
    value: LEVELS,
    icon: IconProps['name'],
    onChange: (l: LEVELS) => void
}) {
    return (
        <div>
            <select id={`${icon}-level-select`} onChange={(i) => onChange(parseInt(i.target.value) as LEVELS)}
                    value={value}>
                {PERMISSION_VALUES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <label htmlFor={`#${icon}-level-select`}>{icon} level</label>
        </div>
    );
}

function SelectColor({value, name, onChange}: { value: string, name: string, onChange: (s: string) => void }) {
    return (
        <div>
            <input id={`${name}-color`} type={'color'} onChange={(i) => onChange(i.target.value)}
                   value={value}/>
            <label htmlFor={`#${name}-color`}>{name} color</label>
        </div>
    );
}

function InputText({value, name, onChange, multiline = false}: { value: string, name: string, onChange: (s: string) => void, multiline?: boolean }) {
    return (
        <div>
            {
                multiline ?
                    (<textarea id={`${name}-text`} onChange={(i) => onChange(i.target.value)} value={value}/>) :
                    (<input id={`${name}-text`} type={'text'} onChange={(i) => onChange(i.target.value)} value={value}/>)
            }
            <label htmlFor={`#${name}-text`}>{name}</label>
        </div>
    );
}

function CardSiteAccessBG(
    {
        num_lines = 7,
        font_size = 10,
        text,
    }: {
        num_lines?: number,
        font_size?: number,
        text: string,
    }) {
    const padding = 5;

    const bg = ` \
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='${font_size * 2}px' width='${font_size * 10}px'> \
            <style>text {font-weight: bold }</style>\
            <text x='0' y='${font_size * .8}' font-size='${font_size}' font-family='sans-serif'>SITE ACCESS CARD</text> \
            <text x='${font_size * 5}px' y='${font_size * 1.8}' font-size='${font_size}' font-family='sans-serif'>SITE ACCESS CARD</text> \
            <text x='-${font_size * 5}px' y='${font_size * 1.8}' font-size='${font_size}' font-family='sans-serif'>SITE ACCESS CARD</text> \
        </svg>") \
    `;

    const textRef = useRef<SVGTextElement | null>(null);
    useEffect(
        () => {
            if (textRef.current) {
                const bbox = textRef.current.getBBox();
                const vbox = [bbox.x - padding, bbox.y, bbox.width + padding * 2, bbox.height].join(" ");
                textRef.current.parentElement?.setAttribute('viewBox', vbox);
            }
        },
        [text],
    );


    return (
        <div className={'site-access-card-text'} style={{
            fontSize: '4.9em',
            textAlign: 'left',
            fontWeight: 'bold',
            height: '77px',
        }}>
            <svg style={{position: 'absolute', width: '100%',
                height: `${font_size * num_lines}px`,}}>
                <defs>
                    <linearGradient id='mygradient'>
                        <stop offset='5%' stopColor={'var(--detail-color)'}/>
                        <stop offset='95%' stopColor={'var(--card-color)'}/>
                    </linearGradient>
                </defs>
                <rect width='100%' height='100%' fill="url('#mygradient')"/>
            </svg>
            <div style={{
                position: 'absolute',
                backgroundColor: 'var(--detail-color)',
                maskImage: bg,
                width: '100%',
                height: `${font_size * num_lines}px`,
            }} />
            <svg style={{position: 'absolute', bottom: 0, width: '100%', height: '100%'}} preserveAspectRatio="xMinYMax">
                <text ref={textRef} fill={'var(--text-color)'}>{text}</text>
            </svg>
        </div>
    );
}

function CardWavyBg() {
    const backgroundImage = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 600 170' height='10px' width='20px' xmlns='http://www.w3.org/2000/svg'> \
  <g transform='translate(0,450)scale(.075,.075)'> \
    <path d='M 3545 -4861 l -20 8 -76 7 -75 7 -100 33 -99 34 -56 20 -55 20 -50 24 -49 25 -40 13 -40 13 -95 52 -95 52 -70 43 -70 42 -25 23 -25 22 -158 107 -158 107 -60 47 -61 47 -91 74 -91 74 -63 39 -64 39 \
    -59 47 -59 48 -68 40 -67 39 -40 33 -39 33 -46 26 -46 27 -85 56 -85 57 -75 46 -76 45 -34 16 -35 16 -92 35 -93 35 -23 0 -24 0 -59 20 -59 21 -90 15 -90 15 -208 6 -207 6 0 215 0 215 222 -6 223 -6 115 -20 115 -20 50 -16 50 \
    -16 51 -9 50 -8 95 -37 94 -36 74 -31 73 -32 72 -44 71 -45 125 -80 125 -80 55 -35 55 -35 30 -24 30 -24 100 -65 100 -66 25 -22 25 -22 58 -35 59 -34 66 -56 67 -56 85 -66 85 -65 165 -113 165 -112 25 -22 25 -22 40 -23 40 \
    -23 58 -33 57 -33 88 -37 87 -36 65 -25 65 -25 55 -20 55 -20 80 -10 80 -9 151 -5 151 -5 89 11 89 11 60 10 60 9 50 9 50 8 28 12 28 11 40 0 40 0 37 19 37 18 75 22 75 23 15 13 15 13 70 43 70 43 60 31 60 32 80 45 80 45 \
    84 52 84 52 37 32 38 32 59 35 58 34 36 31 37 30 82 49 83 49 31 27 31 27 65 43 65 44 25 27 26 26 49 27 50 26 115 80 115 81 60 42 60 41 62 23 62 22 108 54 108 54 130 37 130 38 25 8 25 8 65 20 65 20 45 11 45 11 87 15 \
    86 15 27 10 26 10 112 10 112 10 143 0 142 0 0 -213 0 -214 -208 -6 -207 -6 -35 -11 -35 -11 -75 -13 -75 -14 -50 -11 -50 -12 -60 -20 -60 -21 -40 -10 -40 -11 -95 -27 -95 -28 -130 -61 -130 -61 -31 -18 -32 -17 -68 -47 \
    -69 -46 -105 -71 -105 -71 -20 -19 -20 -18 -75 -52 -75 -51 -40 -31 -40 -31 -68 -40 -68 -39 -32 -29 -32 -28 -61 -35 -60 -36 -47 -38 -46 -38 -88 -54 -88 -54 -95 -55 -95 -56 -50 -26 -50 -25 -50 -29 -50 -30 -30 -24 -30 \
    -25 -55 -25 -55 -25 -85 -29 -85 -30 -69 -24 -69 -24 -29 0 -29 0 -22 -11 -21 -12 -70 -9 -71 -9 -60 -10 -60 -9 -85 -9 -85 -10 -190 0 -190 0 -20 8 z ' /> \
  </g> \
</svg>")`;
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="420" height="400" viewBox="1 -6 8 4" fill="none" style={{
                position: 'absolute',
            }}>
                <path d="M0 0c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.1 0.3c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.2 0.6c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.3 0.9c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.4 1.2c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.5 1.5c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.6 1.8c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.7 2.1c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
                <path d="M0.8 2.4c4-1 5-4 6-7" stroke="var(--detail-color)" strokeWidth={0.1}/>
            </svg>
            <div className="wavy-container" style={{
                background: 'var(--wavy-color)',
                maskImage: backgroundImage,
                position: 'absolute',
            }}/>
        </>
    );
}

function CardHolder({name, bottom_text}: {name: string, bottom_text: string}) {
    return (
        <div style={{
            transform: 'rotate(-90deg)',
            color: 'var(--text-color)',
            position: 'absolute',
            left: '53%',
            top: '35%',
            width: '200px',
            borderTop: '1px solid color-mix(in oklab, var(--text-color) 30%, white)',
            textAlign: 'start',
            height: '200px',
        }}>
            <span style={{color: 'color-mix(in oklab, var(--text-color) 30%, white)', fontSize: '0.8rem'}}>CARD HOLDER:</span>
            <br/>
            <span style={{marginLeft: '5px', fontSize: '1.5rem'}}>{name}</span>
            <p style={{position: 'absolute', fontSize: '6px', bottom: '-30px'}}>{bottom_text}
            </p>
        </div>
    );
}