import { useSound } from "use-sound";
import { useAppSelector } from "../app/hooks";
import { selectVolume } from "../appSlice";

export default function useSoundHook() {
  const volume = useAppSelector(selectVolume);

  const correctSound = require("../assets/610703__oggraphics__good-answer-harp-glissando.wav");
  const wrongSound = require("../assets/150879__nenadsimic__jazzy-chords.wav");
  const timeoutSound = require("../assets/715226__pigeonfriend__rejectionincorrecterror.wav");
  const moneySound = require("../assets/566201__colorscrimsontears__coin-rpg.wav");

  const [playCorrectSound] = useSound(correctSound, { volume:volume });
  const [playWrongSound] = useSound(wrongSound, { volume:volume });
  const [playTimeOutSound] = useSound(timeoutSound, { volume:volume });
  const [playMoneySound] = useSound(moneySound, { volume:volume });

  return {playCorrectSound, playWrongSound, playTimeOutSound, playMoneySound};
}
