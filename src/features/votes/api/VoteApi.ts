import axiosClient from "../../../shared/api/ClientApi";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { VoteDetails } from "../../../shared/types/VoteDetails";
import type { ApiResponse } from "../../auth/types/response/ApiResponse";
import type { ApiSuccess } from "../../auth/types/response/ApiSuccess";
import type { VotePayload } from "../types/VoteCustom";

export async function storeVoteRequest (
    payload:VotePayload
) : Promise<ApiResponse<VoteDetails>>{
    try{
         const response = await axiosClient.post<ApiSuccess<VoteDetails>>(
      "votes",
      payload
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
    }

