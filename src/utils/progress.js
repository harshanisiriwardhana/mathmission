import { saveProgress, loadProgress } from './storage';

export function getInitialProgress() {
  return {
    currentWorld: 0,
    currentLesson: 0,
    worlds: {},
  };
}

export function getLessonProgress(accessKey, worldId, lessonId) {
  const progress = loadProgress(accessKey);
  if (!progress) return null;
  return progress.worlds?.[worldId]?.[lessonId] || null;
}

export function saveLessonProgress(accessKey, worldId, lessonId, stars) {
  let progress = loadProgress(accessKey) || getInitialProgress();
  if (!progress.worlds[worldId]) {
    progress.worlds[worldId] = {};
  }
  progress.worlds[worldId][lessonId] = { stars, completed: true };
  saveProgress(accessKey, progress);
}

export function getWorldProgress(accessKey, worldId) {
  const progress = loadProgress(accessKey);
  if (!progress) return 0;
  const world = progress.worlds?.[worldId];
  if (!world) return 0;
  return Object.keys(world).length;
}

export function isLessonUnlocked(accessKey, worldId, lessonId) {
  if (lessonId === 0) return true;
  const prev = getLessonProgress(accessKey, worldId, lessonId - 1);
  return prev !== null;
}