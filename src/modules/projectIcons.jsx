import { Wifi, Ticket, Image, Mic, Type, MessagesSquare, PlayCircle, FileArchive, MapPin, Pointer, BookImage } from "lucide-react";


//SideBar Icons
export const TextIcon = () => (
    <svg
    width="28"
        height="48"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <text x="4" y="20" font-size="15" font-weight="bold" fill="#237804">Tt</text>
    </svg>

  );

const Icon = ({ IconComponent }) => (
    <IconComponent size={18} color="#237804" />
  );

//apps

export const ImageArrowIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* The 'image' rectangle */}
    <rect x="2" y="4" width="12" height="10" rx="2" ry="2" />
    
    {/* The circle inside (like a 'photo' placeholder) */}
    <circle cx="7" cy="8" r="2" />
    
    {/* A small horizontal line at the bottom of the rectangle */}
    <path d="M5 12h4" />
    
    {/* Arrow pointing to the right */}
    <path d="M16 8h4" />
    <path d="M20 8l-2-2m2 2l-2 2" />
  </svg>
);

export const MyNewIcon = () => {
  return (
    <div>
      <Icon IconComponent={ImageArrowIcon} />
    </div>
  );
};

export const WifiIcon = () =>{
  return (
      <div>
        <Icon IconComponent={Wifi} />
      </div>
    );
}

export const TicketIcon = () =>{
  return (
      <div>
        <Icon IconComponent={Ticket} />
      </div>
    );
}

//Nodes

export const VideoIcon = () =>{
    return (
        <div>
          <Icon IconComponent={PlayCircle} />
        </div>
      );
}

export const ImageIcon = () =>{
    return (
        <div>
           <Icon IconComponent={Image} />
        </div>
      );
}

export const AudioIcon = () =>{
    return (
        <div>
           <Icon IconComponent={Mic} />
        </div>
      );
}

export const TextIcon2 = () =>{
    return (
        <div>
           <Icon IconComponent={Type} />
        </div>
      );
}

export const FileIcon = () =>{
  return (
      <div>
         <Icon IconComponent={FileArchive} />
      </div>
    );
}

export const LocationIcon = () =>{
  return (
      <div>
         <Icon IconComponent={MapPin} />
      </div>
    );
}

export const ButtonIcon = () =>{
  return (
      <div>
         <Icon IconComponent={Pointer} />
      </div>
    );
}

export const ExternalLinkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ marginRight: '4px' }}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);


export const MessagesIcon = () =>{
  return (
      <div>
         <Icon IconComponent={MessagesSquare} />
      </div>
    );
}


const CardExIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    {/* <!-- No background rectangle here, so it stays white by default --> */}
    
    {/* <!-- Green bounding rectangle for the "image" --> */}
    <rect
      x="30" y="20" width="40" height="60"
      rx="4"
      fill="none"
      stroke="#1e8c01"
      stroke-width="3"
    />
    
    {/* <!-- Horizontal divider --> */}
    <line
      x1="30" y1="45"
      x2="70" y2="45"
      stroke="#1e8c01"
      stroke-width="3"
      stroke-linecap="round"
    />
    
    {/* <!-- Mountain shape in top section --> */}
    <path
      d="M33 40 L45 30 L57 40"
      fill="none"
      stroke="#1e8c01"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    
    {/* <!-- Small circle (sun) in top-right --> */}
    <circle
      cx="54" cy="28" r="3"
      fill="#1e8c01"
    />
    
    {/* <!-- Single line in bottom section --> */}
    <line
      x1="40" y1="65"
      x2="60" y2="65"
      stroke="#1e8c01"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>

);

export const CardIcon = () =>{
  return (
      <div>
         <Icon IconComponent={BookImage} />
      </div>
    );
}

//Property Panel Icons

export const TextInputPropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="100%" height="100%">
    <rect width="16" height="16" rx="1" fill="#1e8c01" />
    <path d="M2.5 3.5 C2.2 3.5, 2 3.7, 2 4 L2 6.5 C2 6.8, 2.2 7, 2.5 7 L3.2 7 L3.2 8 L4.2 7 L10.5 7 C10.8 7, 11 6.8, 11 6.5 L11 4 C11 3.7, 10.8 3.5, 10.5 3.5 Z" 
          fill="#1e8c01" stroke="white" strokeWidth="0.4" strokeLinejoin="round"/>
    <path d="M5.5 9 C5.2 9, 5 9.2, 5 9.5 L5 12 C5 12.3, 5.2 12.5, 5.5 12.5 L12 12.5 L12.8 13.5 L12.8 12.5 L13.5 12.5 C13.8 12.5, 14 12.3, 14 12 L14 9.5 C14 9.2, 13.8 9, 13.5 9 Z"
          fill="#1e8c01" stroke="white" strokeWidth="0.4" strokeLinejoin="round"/>
    <circle cx="7.5" cy="10.75" r="0.35" fill="white"/>
    <circle cx="9.5" cy="10.75" r="0.35" fill="white"/>
    <circle cx="11.5" cy="10.75" r="0.35" fill="white"/>
  </svg>
);

export const LocationPropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  {/* <!-- Green background --> */}
  <rect width="16" height="16" rx="1" fill="#1e8c01" />
  
  {/* <!-- Pin shape --> */}
  <path
    d="M8 5.5
       A2.5 2.5 0 0 1 10.5 8
       C10.5 9.3 8 12 8 12
       C8 12 5.5 9.3 5.5 8
       A2.5 2.5 0 0 1 8 5.5
       Z"
    fill="none"
    stroke="#fff"
    stroke-width="1"
    stroke-linejoin="round"
  />
  
  {/* <!-- Small circle in center of pin --> */}
  <circle
    cx="8" cy="8" r="0.8"
    fill="none"
    stroke="#fff"
    stroke-width="1"
  />
</svg>

);


export const ImagePropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="8" fill="#1e8c01"/>
    <rect x="30" y="30" width="40" height="40" stroke="white" stroke-width="3" fill="none"/>
    <circle cx="40" cy="40" r="3" fill="white"/>
    <polyline points="30,60 45,45 55,55 70,40" stroke="white" stroke-width="3" fill="none"/>
  </svg>

);


export const VideoPropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="8" fill="#1e8c01"/>
    <circle cx="50" cy="50" r="20" stroke="white" stroke-width="4" fill="none"/>
    <polygon points="45,40 60,50 45,60" fill="white"/>
  </svg>

);

export const AudioPropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="8" fill="#1e8c01" />
    
    <path
      d="
        M50,30
        a10,10 0 0 1 10,10
        v10
        a10,10 0 0 1 -20,0
        v-10
        a10,10 0 0 1 10,-10
      "
      fill="none"
      stroke="#fff"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    
    <line
      x1="50" y1="70"
      x2="50" y2="80"
      stroke="#fff"
      stroke-width="4"
      stroke-linecap="round"
    />
    
    <path
      d="M30,60 Q50,80 70,60"
      fill="none"
      stroke="#fff"
      stroke-width="4"
      stroke-linecap="round"
    />
  </svg>

);

export const FilePropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="8" fill="#1e8c01"/>
    <rect x="35" y="30" width="30" height="40" rx="5" stroke="white" stroke-width="3" fill="none"/>
    <rect x="40" y="25" width="20" height="8" rx="3" stroke="white" stroke-width="3" fill="none"/>
    <line x1="40" y1="45" x2="60" y2="45" stroke="white" stroke-width="3"/>
    <line x1="40" y1="50" x2="55" y2="50" stroke="white" stroke-width="3"/>
  </svg>


);