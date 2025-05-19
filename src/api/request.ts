type RequestOptions = {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: any;
	headers?: Record<string, string>;
};

export class ApiError extends Error {
	status: number;
	data: any;

	constructor(message: string, status: number, data?: any) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
	const { method = "GET", body, headers = {} } = options;

	try {
		const response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
				...headers,
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		const data = await response.json();

		if (!response.ok) {
			throw new ApiError(`Request failed with status ${response.status}`, response.status, data);
		}

		return data as T;
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}

		if (error instanceof TypeError && error.message.includes("fetch")) {
			throw new ApiError("Network error - unable to connect to server", 0);
		}

		throw new ApiError(`Unexpected error: ${(error as Error).message}`, 500);
	}
}
