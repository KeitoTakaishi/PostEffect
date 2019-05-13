/*
Flashing Glitch
*/
out vec4 fragColor;
uniform float time;
void main()
{
	vec2 uv = vUV.st;
   	vec4 color = texture(sTD2DInputs[0], uv);
   	vec4 black = vec4(vec3(0.0), 1.0);
   	vec4 dstCol = vec4(1.0);
   	

	float noise = TDSimplexNoise(vec2(uv.y * 10.0, time * 10.0));
	float threshould = 0.5;
	vec2 delta = vec2(0.02);
	if(noise > threshould){
		color.g = texture(sTD2DInputs[0], fract(uv - delta)).g;
        color.b = texture(sTD2DInputs[0], fract(uv + delta)).b;
	}


	float t = time * 1.0;

   	if(fract(t*2.0) > 0.6){
   		//dstCol.rgb = vec3(1.0) - color.rgb;
		dstCol = black;

		//for wave
		float ny = uv.y + TDSimplexNoise(vec3(uv.x* 100.00, uv.y* 100.0, time*10.0));
		noise = TDSimplexNoise(vec2(ny, time * 10.0));
		if(noise > 0.2){
			dstCol += texture(sTD2DInputs[0], fract(uv + delta));
			//dstCol.b += texture(sTD2DInputs[0], fract(uv + delta)).b;
			//dstCol.g += texture(sTD2DInputs[0], fract(uv + delta)).g;
		}

   	}else if(fract(t*2.0) > 0.3  &&  fract(time*2.0) < 0.6){
		dstCol.rgb = vec3(1.0) - color.rgb;

		//for wave
		float ny = uv.y + TDSimplexNoise(vec3(uv.x* 100.00, uv.y* 100.0, time*10.0));
		noise = TDSimplexNoise(vec2(ny, time * 10.0));
		if(noise > 0.2){
			dstCol.r += texture(sTD2DInputs[0], fract(uv - delta)).r;
			dstCol.b += texture(sTD2DInputs[0], fract(uv + delta)).b;
		}
		   
	}
	
	else{
   		dstCol = color;
   	}
   	
    
    fragColor = TDOutputSwizzle(dstCol);
}
