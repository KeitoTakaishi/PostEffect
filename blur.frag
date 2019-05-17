out vec4 fragColor;

uniform float blurSize;
uniform float width;
uniform float height;
uniform vec2 direction;

void main()
{
	vec2 TC = vUV.st;
	const int N = 16;
	float delta = blurSize / float(N);
	vec4 color = texture(sTD2DInputs[0], TC);
	
	for(int i = 0; i < N; i++){
		vec2 d = direction * (float(i) * delta);
		color.rgb += texture(sTD2DInputs[0], TC + d/width).rgb;
		color.rgb += texture(sTD2DInputs[0], TC - d/width).rgb;
	}
    color.rgb /= float(N) * 2.0 + 1.0;
    fragColor = TDOutputSwizzle(color);
}
