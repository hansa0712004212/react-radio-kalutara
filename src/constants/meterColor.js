import { Colors } from ".";

export const RAINBOW = [
    { stop: 0.6, color: Colors.BLUE },
    { stop: 0.5, color: Colors.GREEN },
    { stop: 0.4, color: Colors.YELLOW },
    { stop: 0.3, color: Colors.ORANGE },
    { stop: 0.2, color: Colors.RED }
];

export const SKY = [
    { stop: 0.7, color: Colors.BLUE },
    { stop: 0.3, color: Colors.AQUA },
    { stop: 0.2, color: Colors.WHITE }
];

export const FIRE = [
    { stop: 0.5, color: Colors.RED },
    { stop: 0.4, color: Colors.YELLOW },
    { stop: 0.2, color: Colors.BLUE }
];

export const LIST = [RAINBOW, FIRE, SKY];