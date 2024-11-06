package com.skyx4fare;

import com.x4fare.mobipix.onboard.sdk.OnboardCallback;
import com.x4fare.mobipix.onboard.sdk.dto.MobiPixResponseDTO;
import com.x4fare.mobipix.onboard.sdk.dto.InitResponseDTO;
import android.util.Log;


public class CallbackInit implements OnboardCallback<MobiPixResponseDTO<InitResponseDTO>> {

    private String backStatus;
   @Override
public void onSuccess(MobiPixResponseDTO<InitResponseDTO> response) {
    // código de tratamento de sucesso
  setBackStatus(response.getResponse().toString());
    Log.v("X4Init",response.getResponse().toString());
}

@Override
public void onError(MobiPixResponseDTO<InitResponseDTO> response) {
    // código de tratamento de erro
  setBackStatus(response.getResponse().toString());
    Log.v("X4Init",response.getResponse().toString());
}


public void setBackStatus(String str){
    this.backStatus = str;
}
public String getBackStatus(){
    return this.backStatus;
}


}
