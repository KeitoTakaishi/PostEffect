/*this shader is sobel edge detective*/

float     hCoef[9] = {1.0,  0.0, -1.0, 2.0,  0.0, -2.0, 1.0,  0.0, -1.0};
float     vCoef[9] = {1.0,  2.0,  1.0, 0.0,  0.0,  0.0, -1.0, -2.0, -1.0};
uniform float width;    //op('moviein1').width
uniform float height;   //op('moviein1').height

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);


out vec4 fragColor;
void main()
{
    vec2 uv = vUV.st;
    vec4 color = texture(sTD2DInputs[0], uv);
    vec2 size = vec2(1.0/width,1.0/ height);

    vec2 offset[9];
    offset[0] = vec2(-1.0, -1.0);
    offset[1] = vec2( 0.0, -1.0);
    offset[2] = vec2( 1.0, -1.0);
    offset[3] = vec2(-1.0,  0.0);
    offset[4] = vec2( 0.0,  0.0);
    offset[5] = vec2( 1.0,  0.0);
    offset[6] = vec2(-1.0,  1.0);
    offset[7] = vec2( 0.0,  1.0);
    offset[8] = vec2( 1.0,  1.0);

    vec3  horizonColor = vec3(0.0);
    vec3  verticalColor = vec3(0.0);
    vec4  destColor = vec4(0.0);
    
    
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[0] * size)).rgb * hCoef[0];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[1] * size)).rgb * hCoef[1];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[2] * size)).rgb * hCoef[2];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[3] * size)).rgb * hCoef[3];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[4] * size)).rgb * hCoef[4];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[5] * size)).rgb * hCoef[5];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[6] * size)).rgb * hCoef[6];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[7] * size)).rgb * hCoef[7];
    horizonColor  += texture2D(sTD2DInputs[0], uv + (offset[8] * size)).rgb * hCoef[8];

    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[0] * size)).rgb * vCoef[0];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[1] * size)).rgb * vCoef[1];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[2] * size)).rgb * vCoef[2];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[3] * size)).rgb * vCoef[3];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[4] * size)).rgb * vCoef[4];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[5] * size)).rgb * vCoef[5];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[6] * size)).rgb * vCoef[6];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[7] * size)).rgb * vCoef[7];
    verticalColor += texture2D(sTD2DInputs[0], uv + (offset[8] * size)).rgb * vCoef[8];
    

    destColor = vec4(vec3(sqrt(horizonColor * horizonColor + verticalColor * verticalColor)), 1.0);
    float grayColor = dot(destColor.rgb, monochromeScale);
    destColor = vec4(vec3(grayColor), 1.0);
    
    fragColor = TDOutputSwizzle(destColor);
}

