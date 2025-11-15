import { useState, useEffect, useRef } from 'react';
import {Play, Pause, SkipBack, SkipForward} from 'lucide-react';

import styles from './music-player.module.css';

const PLAYLIST = [
    {
        title: "Change",
        url: "/audio/dftns_change.mp3",
    },
    {
        title: "My own summer",
        url: "/audio/dftns_my_own_summer.mp3",
    },
    {
        title: "Sextape",
        url: "/audio/dftns_sextape.mp3",
    },
    {
        title: "Be Quiet and Drive",
        url: "/audio/dftns_be_quiet_and_drive.mp3"
    },
    {
        title: "Rosemary",
        url: "/audio/dftns_rosemary.mp3"
    },
    {
        title: "Strangers ",
        url: "/audio/strangers.mp3"
    },
    {
        title: "Vanished",
        url: "/audio/vanished.mp3",
    },
    {
        title: "Crimewave",
        url: "/audio/crimewave.mp3"
    },
    {
        title: "Empathy",
        url: "/audio/empathy.mp3"
    },
    {
        title: "Love Potions",
        url: "/audio/love_potions.mp3"
    },
];

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString()}:${s.toString().padStart(2, '0')}`;
};

export const MusicPlayer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);

    const currentTrack = PLAYLIST[currentIndex];

    const safePlay = () => {
        audioRef.current?.play().catch(e => {
            console.error("Ошибка воспроизведения:", e);
            setIsPlaying(false);
        });
    }

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            safePlay();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const prevTrack = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? PLAYLIST.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.load();
        if (isPlaying) {
            safePlay();
        }
    }, [currentIndex]);

    const handleEnded = () => {
        nextTrack();
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
    };

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setDuration(e.currentTarget.duration);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !progressContainerRef.current || !duration) return;

        const clickX = e.nativeEvent.offsetX;
        const width = progressContainerRef.current.clientWidth;
        const newTime = (clickX / width) * duration;

        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const progressPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className={styles.player}>
            <audio
                ref={audioRef}
                src={currentTrack.url}
                onEnded={handleEnded}
                loop={false}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div
                className={styles['progress-container']}
                ref={progressContainerRef}
                onClick={handleProgressClick}
                title="Перемотать"
            >
                <div
                    className={styles['progress-bar']}
                    style={{ width: `${progressPercent}%` }}
                ></div>
            </div>

            <div className={styles['bottom-row']}>
                <div className={styles.controls}>
                    <button onClick={prevTrack} className={styles.button} title="Предыдущий трек">
                        <SkipBack size={16} />
                    </button>
                    <button onClick={togglePlay} className={styles.button} title={isPlaying ? "Пауза" : "Воспроизвести"}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={nextTrack} className={styles.button} title="Следующий трек">
                        <SkipForward size={16} />
                    </button>
                </div>

                <div className={styles.info}>
                    <span className={styles.title} title={currentTrack.title}>
                        {currentTrack.title}
                    </span>
                    <span className={styles.time}>
                        {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                </div>
            </div>
        </div>
    );
};