import SERVER from "@/http";
import { AxiosResponse } from "axios";

export enum HttpMethods {
	GET = 'get',
	POST = 'post',
	PATCH = 'patch',
	PUT = 'put',
	DELETE = 'delete'
}

export const fetchApi = <T, R>(args: { url: string, body?: T, method: HttpMethods }, callback?: (arg: R) => void): Promise<R>  => {
	return new Promise<R>((resolve, reject) => {
		return SERVER[args.method](args.url, args.body)
			.then((response: AxiosResponse<R>) => {
				if (callback) callback(response.data);
				resolve(response.data);
			})
			.catch((error: Record<string, string>) => reject(error))
	})
}