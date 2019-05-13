uniform float time;
out vec4 fragColor;

void main() {
    vec2 uv = vUV.st;
    vec4 color = texture(sTD2DInputs[0], uv);

    // Ignore background
    color *= step(1.2, length(color));

    int N = 5;
    for (int i = 0; i < N; i++) {
        uv.y += TDSimplexNoise(vec2(uv.x * 10., time * 0.6)) * 0.02 ;
        uv.x += TDSimplexNoise(vec2(uv.y * 10., time * 0.6)) * 0.02 ;
        // uv.x += TDSimplexNoise(vec2(uv.x * 100., time * 0.2)) * 0.01;
        // uv.y += TDSimplexNoise(vec2(uv.y * 100., time * 0.2)) * 0.01 ;
        color += texture(sTD2DInputs[0], uv) / float(N);
    }
    color *= .7;

    fragColor = TDOutputSwizzle(color);
}