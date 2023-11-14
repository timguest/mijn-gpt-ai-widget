import { writable } from 'svelte/store';
import type { Message } from '../types/index';

export const messages = writable<Message[]>([]);

export const isChatOpen = writable(false);
