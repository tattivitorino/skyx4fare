
package com.skyx4fare;

import com.x4fare.mobipix.onboard.sdk.OnboardCallback;
import com.x4fare.mobipix.onboard.sdk.dto.MobiPixResponseDTO;
import com.x4fare.mobipix.onboard.sdk.dto.ChargeRiderResponseDTO;
import android.util.Log;


public class CallbackTransaction implements OnboardCallback<MobiPixResponseDTO<ChargeRiderResponseDTO>> {

    private String backStatus;
   @Override
public void onSuccess(MobiPixResponseDTO<ChargeRiderResponseDTO> response) {
    // código de tratamento de sucesso

    setBackStatus(response.getResponse().toJson());
    Log.v("X4Init",response.getResponse().toJson());
    Log.v("X4Init",response.toString());

}

@Override
public void onError(MobiPixResponseDTO<ChargeRiderResponseDTO> response) {
    // código de tratamento de erro
    setBackStatus(response.getResponse().toJson());
    Log.v("X4Init",response.getResponse().toJson());
    Log.v("X4Init",response.toString());
}


public void setBackStatus(String str){
    this.backStatus = str;
}
public String getBackStatus(){
    return this.backStatus;
}


}
