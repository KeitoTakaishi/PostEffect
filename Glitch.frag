/*
simpel block Glitch
*/

uniform float time;
out vec4 fragColor;
void main()
{
    vec2 uv = vUV.st;
    vec4 color = texture(sTD2DInputs[0], uv);
    float threshould = 0.5;
    vec2 delta = vec2(0.02);
    
    /*
    //slice on y
    float noise = TDSimplexNoise(vec2(uv.y*10.0, time*10.0));
   	if(noise > 0.5){
   		color.r = texture(sTD2DInputs[0], fract(uv+delta)).r;   
   	}
    */
    
    
    //gritch
    float NUM_BLOCKS = 20.;
    vec2 block = floor(uv * NUM_BLOCKS) / NUM_BLOCKS;
    float noise = TDSimplexNoise(vec3(block * 30., time * 10.));
    if (noise > 0.5) {
        color.r = texture(sTD2DInputs[0], fract(uv - delta)).r;
        color.b = texture(sTD2DInputs[0], fract(uv + delta)).b;
    }
    
   	//color.rgb = vec3(noise);
    fragColor = TDOutputSwizzle(color);
}
