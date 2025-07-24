import java.util.*;

class Solution {
    private List<List<Integer>> graph;
    private String label;
    private int maxLength = 1;
    
    public int maxLen(int n, int[][] edges, String label) {
        this.label = label;
        
        // Build adjacency list
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        
        // Try starting from each node
        for (int start = 0; start < n; start++) {
            boolean[] visited = new boolean[n];
            StringBuilder path = new StringBuilder();
            dfs(start, visited, path);
        }
        
        return maxLength;
    }
    
    private void dfs(int node, boolean[] visited, StringBuilder path) {
        visited[node] = true;
        path.append(label.charAt(node));
        
        // Check if current path is palindrome
        String currentPath = path.toString();
        if (isPalindrome(currentPath)) {
            maxLength = Math.max(maxLength, currentPath.length());
        }
        
        // Pruning: if current path length + remaining unvisited nodes <= maxLength, return
        int remainingNodes = 0;
        for (boolean v : visited) {
            if (!v) remainingNodes++;
        }
        if (path.length() + remainingNodes <= maxLength) {
            // Backtrack
            visited[node] = false;
            path.deleteCharAt(path.length() - 1);
            return;
        }
        
        // Continue DFS to adjacent nodes
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited, path);
            }
        }
        
        // Backtrack
        visited[node] = false;
        path.deleteCharAt(path.length() - 1);
    }
    
    private boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}