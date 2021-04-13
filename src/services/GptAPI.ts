import axios from "axios";
import {AxiosPromise} from "axios";
import {CompletionParameters} from "../slices/editorSlice";

export interface ChoiceResult {
    finish_reason: string;
    index: number;
    text: string;
}

//const HOST = `https://api.openai.com`;
//const HOST = `http://localhost:9000`;
const HOST = `http://api.gpt4.org:9000`;

class GptAPI {
    static generateCompletions(prompt: string | Array<string>, completionParams: CompletionParameters,
                               n: number = 1, echo: boolean = true): AxiosPromise {
        return axios({
            method: "POST",
            url: `${HOST}/v1/engines/${completionParams.engine}/completions`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${completionParams.apiKey}`,
            },
            data: {
                "echo": echo,
                "prompt": prompt,
                "n": n,
                "max_tokens": completionParams.maxTokens,
                "temperature": completionParams.temperature,
                "stop": completionParams.stop,
                "top_p": completionParams.topP,
                "presence_penalty": completionParams.presencePenalty,
                "frequency_penalty": completionParams.frequencyPenalty
            }
        });
    }
}

export default GptAPI;