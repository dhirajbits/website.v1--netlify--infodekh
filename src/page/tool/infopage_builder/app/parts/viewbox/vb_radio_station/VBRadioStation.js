import { VBEvent } from "./VBEvent.js";
import { VBEventListener } from "./VBEventListener.js";

export class VBRadioStation {
	static createAndAddVBEventListener({
		eventName,
		viewName,
		callback,
		callbackArgDict,
	}) {
		if (!VBRadioStation._instance)
			VBRadioStation._instance = new VBRadioStation();

		VBRadioStation._instance.createAndAddVBEventListener({
			eventName: eventName,
			viewName: viewName,
			callback: callback,
			callbackArgDict: callbackArgDict,
		});
	}

	static async createAndBroadcastVBEvent({ eventName, viewName, data }) {
		if (!VBRadioStation._instance)
			VBRadioStation._instance = new VBRadioStation();

		await VBRadioStation._instance.createAndBroadcastVBEvent({
			eventName: eventName,
			viewName: viewName,
			data: data,
		});
	}

	constructor() {
		if (VBRadioStation._instance) return VBRadioStation._instance;
		else VBRadioStation._instance = this;

		this.listeners = []; //Array[VBEventListener]
	}

	createAndAddVBEventListener({
		eventName,
		viewName,
		callback,
		callbackArgDict,
	}) {
		const vbEventListener = new VBEventListener({
			eventName: eventName,
			viewName: viewName,
			callback: callback,
			callbackArgDict: callbackArgDict,
		});

		this.listeners.push(vbEventListener);
	}

	async createAndBroadcastVBEvent({ eventName, viewName, data }) {
		const vbEvent = new VBEvent({
			eventName: eventName,
			viewName: viewName,
			data: data,
		});

		const listeners = this.getListenerForVBEvent({ vbEvent: vbEvent });
		listeners.forEach(async (listener) => {
			await listener.callback(vbEvent, listener.callbackArgDict);
		});
	}

	getListenerForVBEvent({ vbEvent }) {
		return this.listeners.filter(
			(listener) =>
				listener.eventName === vbEvent.eventName &&
				listener.viewName === vbEvent.viewName
		);
	}
}
