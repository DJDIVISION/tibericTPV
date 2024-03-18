export const animationOne = {
    in: {
        
        opacity: 1,
        y: 0,
    },
    out: {
         y: '100vh',
        opacity: 0,
        
    }
};

export const animationTwo = {
    in: {
        
        x: 0,
        
        
    },
    out: {
        
        x: "-100vw",
        
    }
};

export const animationThree = {
    in: {
        opacity: 1,
        x: -300
    },
    out: {
        opacity: 0,
        x: 300
    },
    end: {
        x: 0,
        opacity: 1
    }
};

export const animationFour = {
    in: {
        
        x: 0,
        
        
    },
    out: {
        
        x: "100vw",
        
    }
};

export const transition = {
    duration: 0.5,
    type: 'spring',
    stiffness: 400,
    damping: 40
};

export const transitionTwo = {
    duration: 0.5,
    type: 'tween',
};